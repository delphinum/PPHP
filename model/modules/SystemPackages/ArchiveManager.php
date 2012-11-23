<?php
namespace PPHP\model\modules\SystemPackages;

/**
 * Класс, обеспечивающий доступ к архивам компонентов слоя домена для установки.
 * @author Artur Sh. Mamedbekov
 * @package PPHP\model\modules\SystemPackages
 */
class ArchiveManager{
  /**
   * Каталог для временных файлов компоненты.
   * @static
   * @var \PPHP\tools\classes\standard\fileSystem\Directory
   */
  protected static $tmpDir;
  /**
   * Файл конфигурации компоненты.
   * @var \PPHP\tools\classes\standard\fileSystem\File
   */
  protected $confFile;
  /**
   * Конфигурация компоненты.
   * @var \PPHP\tools\classes\standard\fileSystem\FileINI
   */
  protected $conf;
  /**
   * Архив компоненты.
   * @var \ZipArchive
   */
  protected $zip;

  public function __construct(){
    if(!self::$tmpDir){
      self::$tmpDir = \PPHP\tools\classes\standard\fileSystem\ComponentFileSystem::constructDirFromAddress($_SERVER['DOCUMENT_ROOT'] . '/PPHP/model/modules/SystemPackages/tmp');
    }
  }

  /**
   * Метод открывает архив компоненты для чтения. Данный метод должен быть запущен до вызова других методов.
   * @param string $archiveAddress Физический адрес до архива компоненты.
   * @throws \PPHP\tools\classes\standard\fileSystem\NotExistsException Выбрасывается в случае, если компонент не содержит требуемых файлов.
   */
  public function open($archiveAddress){
    $this->zip = new \ZipArchive;
    $this->zip->open($archiveAddress);
    if(!$this->zip->statName('conf.ini')){
      throw new \PPHP\tools\classes\standard\fileSystem\NotExistsException('Нарушена структура модуля.');
    }
    $this->zip->extractTo(self::$tmpDir->getAddress(), ['conf.ini']);
    $this->confFile = self::$tmpDir->getFile('conf.ini');
    $this->conf = new \PPHP\tools\classes\standard\fileSystem\FileINI($this->confFile, true);
  }

  /**
   * Метод определяет, содержит ли компонент указанный список файлов.
   * @param array $filesNames Список имен требуемых файлов.
   * @return boolean true - если все указанные в списке файлы присутствуют в компоненте, иначе - false.
   */
  public function isFilesExists(array $filesNames){
    foreach($filesNames as $fileName){
      if(!$this->zip->statName($fileName)){
        return false;
      }
    }
    return true;
  }

  /**
   * Метод вызывает переданную лямбда функцию передавая ей в качестве единственного аргумента указанный файл.
   * @param string $fileName Имя требуемого файла.
   * @param callback $callback Лямбда функция, призваная работать с файлом.
   * @throws \PPHP\tools\classes\standard\fileSystem\NotExistsException Выбрасывается в случае, если требуемого файла не найдено.
   * @return mixed Данные, возвращаемые лямбда функцией.
   */
  public function getFile($fileName, $callback){
    if(!$this->isFilesExists([$fileName])){
      throw new \PPHP\tools\classes\standard\fileSystem\NotExistsException('Требуемого файла ' . $fileName . ' не существует в архиве компоненты.');
    }
    $this->zip->extractTo(self::$tmpDir->getAddress(), [$fileName]);
    $file = self::$tmpDir->getFile($fileName);
    return $callback($file);
  }

  /**
   * Метод перемещает все присутствующие в компоненте файлы кроме конфигурационного по указанному адресу.
   * @param \PPHP\tools\classes\standard\fileSystem\Directory $location Целевой адрес файлов компоненты.
   * @param array|null $filesNames Имя извлекаемых файлов компоненты или null - если необходимо извлеч все файлы кроме конфигурационного.
   */
  public function moveFiles(\PPHP\tools\classes\standard\fileSystem\Directory $location, array $filesNames = null){
    $this->zip->extractTo($location->getAddress(), $filesNames);
    if($location->isFileExists('conf.ini')){
      $location->getFile('conf.ini')->delete();
    }
  }

  /**
   * Метод определяет, содержит ли файл конфигурации компонента указанные данные.
   * @param array $dataNames Список требуемых данных компоненты следующей структуры [[0 => имяСекции|null, 1 => имяДанных], ...].
   * @return boolean true - если файл конфигурации компоненты содержит все указанные в списке данные, иначе - false.
   */
  public function isDataExists(array $dataNames){
    foreach($dataNames as $dataName){
      if(!$this->conf->isDataExists($dataName[1], $dataName[0])){
        return false;
      }
    }
    return true;
  }

  /**
   * Метод закрывает доступ к компоненте удаляя все временные файлы.
   */
  public function close(){
    $this->zip->close();
    self::$tmpDir->clear();
  }

  /**
   * @return \PPHP\tools\classes\standard\fileSystem\FileINI
   */
  public function getConf(){
    return $this->conf;
  }

  /**
   * @return \PPHP\tools\classes\standard\fileSystem\File
   */
  public function getConfFile(){
    return $this->confFile;
  }

  /**
   * @return \ZipArchive
   */
  public function getZip(){
    return $this->zip;
  }
}
