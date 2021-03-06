<?php
namespace PPHP\tools\patterns\state;
use \PPHP\tools\classes\standard\baseType\exceptions as exceptions;

/**
 * Интерфейс определяет классы, которые изменяют свое поведение с изменением состояния.
 * Класс, реализующий данный интерфейс является контекстым, то есть может изменять свое поведение в зависимости от текущего состояния.
 * Как правило, такого рода класс делегирует поведение объектам-состояниям, что позволяет полиморфно заменять их при смене состояния.
 * В случае, если в качестве состояние установлен контекстный объект, то реализуется архитектура вложенного состояния объекта.
 * @author Artur Sh. Mamedbekov
 * @package PPHP\tools\patterns\state
 */
interface StatesContext{
  /**
   * Метод изменяет состояние объекта на заданное. Изменить состояние объекта может только его подсостояние, передаваемое во втором аргументе. На практике это означает, что нет возможности изменить состояние объекта программно.
   * @abstract
   *
   * @param string $stateName Устанавливаемое состояние.
   * @param State|StatesContext $substate Подсостояние, запрашивающее изменение.
   *
   * @throws exceptions\RuntimeException Исключение выбрасывается при попытке программного изменения состояния.
   * @throws exceptions\InvalidArgumentException Выбрасывается в случае получения параметра недопустимого типа.
   * @throws exceptions\NotFoundDataException Выбрасывается в случае отсутствия состояния с указанным именем.
   */
  public function passageState($stateName, $substate);

  /**
   * Метод возвращает имя текущего состояния объекта.
   * @abstract
   * @return string Имя текущего состояния.
   */
  public function getNameCurrentState();
}