<?php
namespace PPHP\tools\patterns\io;
use \PPHP\tools\classes\standard\baseType\exceptions as exceptions;

/**
 * Интерфейс определяет поток, содержание которого упорядочено.
 * Поток, реализующий данный интерфейс, содержит данные, упорядоченные определенным образом.
 * Такой поток может смещать указатель текущего считываемого или записываемого символа, что позволяет получать данные от ресурса не последовательно.
 * Отсчет байтов в потоке начинается с нуля.
 * @author  Artur Sh. Mamedbekov
 * @package PPHP\tools\patterns\io
 */
interface SeekIO{
  /**
   * Метод устанавливает указатель символа на указанную позицию.
   * @abstract
   *
   * @param integer $position Позиция символа.
   *
   * @throws IOException Выбрасывается в случае ошибки при работе с потоком.
   * @throws exceptions\InvalidArgumentException Выбрасывается в случае получения параметра неверного типа.
   * @return boolean true - если позиция установлена, иначе - false.
   */
  public function setPosition($position);

  /**
   * Метод возвращает текущую позицию указателя.
   * @abstract
   * @throws IOException Выбрасывается в случае ошибки при работе с потоком.
   * @return integer Текущая позиция указателя.
   */
  public function getPosition();
}
