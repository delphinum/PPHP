<?php
namespace PPHP\tools\patterns\memento;

/**
 * Класс позволяет сохранять состояние объекта в себе и возвращать его по требованию хозяина.
 *
 * Хранитель представляет собой "снимок" состояния хозяина на конкретный момент времени.
 * С его помощью объект-хозяин может быть восстановлен в сохраненное состояние.
 * @author Artur Sh. Mamedbekov
 * @package PPHP\tools\patterns\memento
 */
class Memento{
  /**
   * Ассоциативный массив значений хранимых полей.
   * @var mixed[]
   */
  private $properties;

  /**
   * Хозяин хранителя.
   * @var \PPHP\tools\patterns\memento\Originator
   */
  private $originator;

  /**
   * @param \PPHP\tools\patterns\memento\Originator $originator Хозяин хранителя.
   * @param array $savedProperties Сохраняемые значения полей хранителя.
   */
  function __construct(Originator $originator, array $savedProperties){
    $this->originator = $originator;
    $this->properties = $savedProperties;
  }

  /**
   * Метод возвращает хранимые значения полей хранителю.
   * @param \PPHP\tools\patterns\memento\Originator $originator Хозяин хранителя. Метод вернет значения полей только если в данном аргументе передан истинный хозяин хранителя.
   * @return mixed[] Ассоциативный массив значений полей хозяина.
   * @throws AccessException Выбрасывается в случае, если в качестве хозяина передан не истинный хозяин хранителя.
   */
  public final function getState(Originator $originator){
    if($this->originator !== $originator){
      throw new AccessException('Доступ к хранимому состоянию запрещен.');
    }
    return $this->properties;
  }
}