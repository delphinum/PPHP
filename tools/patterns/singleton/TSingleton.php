<?php
namespace PPHP\tools\patterns\singleton;

/**
 * Классическая реализация интерфейса Singleton.
 * @author Artur Sh. Mamedbekov
 * @package PPHP\tools\patterns\singleton
 */
trait TSingleton{
  protected static $instance = [];

  /**
   * Метод возвращает экземпляр данного класса.
   * @static
   * @abstract
   * @return static Единственный экземпляр данного класса.
   */
  public final static function getInstance(){
    $calledClass = get_called_class();
    if(!isset(self::$instance[$calledClass])){
      self::$instance[$calledClass] = new static;
    }
    return self::$instance[$calledClass];
  }

  final function __clone(){
    throw new \PPHP\tools\classes\standard\baseType\exceptions\RuntimeException('Невозможно клонировать класс, реализующий интерфейс Singleton');
  }

  private function __construct(){
  }
}
