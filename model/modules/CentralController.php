<?php
namespace PPHP\model\modules;

spl_autoload_register(function($className){
  require_once $_SERVER['DOCUMENT_ROOT'] . '/' . str_replace('\\', '/', $className) . '.php';
});
ob_start();
register_shutdown_function(function (){
  $error = error_get_last();
  // Обработка ошибки
  if($error){
    $buffer = ob_get_contents();
    ob_end_clean();
    header('HTTP/1.1 200 OK');
    $log = \PPHP\services\log\LogManager::getInstance();
    // Фатальные ошибки
    if($error['type'] == E_CORE_ERROR || $error['type'] == E_ERROR || $error['type'] == E_PARSE || $error['type'] == E_USER_ERROR){
      $log->setMessage(\PPHP\services\log\Message::createError($error['message'] . ' - ' . $error['file'] . ':' . $error['line']));

      // Обработка исключений
      $send = new \stdClass();
      $send->exception = new \stdClass();
      $send->exception->type = 1;
      if(strpos($error['message'], 'Uncaught exception') === 0){
        $className = strpos($error['message'], "'");
        $className = substr($error['message'], $className + 1, strpos($error['message'], "'", $className + 1) - $className - 1);
        $send->exception->class = $className;
      }
      else{
        $send->exception->class = '';
      }
      $send->exception->message = $error['message'];
      $send->exception->file = $error['file'];
      $send->exception->line = $error['line'];
      $send->exception->buffer = $buffer;

      $viewProvider = \PPHP\services\view\ViewProvider::getInstance();
      $viewProvider->sendMessage($send);
    }
  }
  else{
    ob_end_flush();
  }
});
set_error_handler(function($code, $message, $file, $line){
  $log = \PPHP\services\log\LogManager::getInstance();
  $log->setMessage(\PPHP\services\log\Message::createWarning($message . ' - ' . $file . ':' . $line));
}, E_COMPILE_WARNING|E_WARNING|E_USER_WARNING|E_DEPRECATED|E_USER_DEPRECATED|E_CORE_WARNING);
set_error_handler(function($code, $message, $file, $line){
  $log = \PPHP\services\log\LogManager::getInstance();
  $log->setMessage(\PPHP\services\log\Message::createNotice($message . ' - ' . $file . ':' . $line));
}, E_NOTICE|E_USER_NOTICE|E_STRICT);

/**
 * Класс является центральным контроллером системы и отвечает за вызов и передачу модулю сообщений вида, а так же за возврат ему ответа модуля.
 */
class CentralController{
  /**
   * Метод возвращает контроллер указанного конкретного модуля.
   * @static
   * @param string $moduleName Имя зарпашиваемого модуля.
   * @throws \PPHP\services\modules\ModuleNotFoundException Выбрасывается в случае, если требуемого модуля не существует в системе.
   * @return \PPHP\model\classes\ModuleController Контроллер целевого модуля.
   */
  public static function getControllerModule($moduleName){
    return \PPHP\services\modules\ModulesRouter::getInstance()->getController($moduleName);
  }

  /**
   * Данный метод отвечает за передачу модулю сообщения от слоя представления и возврат ответа.
   * @static
   * @throws AccessException Выбрасывается в случае, если доступ к данному методу модуля запрещен.
   */
  public static function main(){
    $viewProvider = \PPHP\services\view\ViewProvider::getInstance();
    $viewMessage = $viewProvider->getMessage();
    $module = $viewMessage['module'];
    $method = $viewMessage['active'];
    $controller = self::getControllerModule($module);

    $send = new \stdClass();
    if(!method_exists($controller, $method)){
      $send->exception = new \PPHP\tools\classes\standard\baseType\exceptions\LogicException('Запрашиваемый интерфейс ' . $method . ' модуля ' . $module . ' отсутствует.');
    }
    else{
      // Проверка прав доступа к методу модуля
      if(AccessManager::getInstance()->isResolved($module, $method)){
        // Верификация данных
        if(isset($viewMessage['message'])){
          $viewMessage['message'] = json_decode($viewMessage['message']);
          VerifierData::verifyArgs($controller->getReflectionMethod($method), $viewMessage['message']);
        }
        else{
          $viewMessage['message'] = [];
        }

        $send->answer = call_user_func_array([$controller, $method], $viewMessage['message']);
      }
      else{
        throw new AccessException('Доступ запрещен.');
      }
    }
    $viewProvider->sendMessage($send);
  }
}

CentralController::main();