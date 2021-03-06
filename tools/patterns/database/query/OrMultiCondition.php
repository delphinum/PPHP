<?php
namespace PPHP\tools\patterns\database\query;

/**
 * Множественное логическое выражение с OR логическим разделителем.
 * @author Artur Sh. Mamedbekov
 * @package PPHP\tools\patterns\database\query
 */
class OrMultiCondition extends QueryCondition{
  /**
   * Метод должен возвращать объединяющий логический оператор ИЛИ.
   * @static
   * @return string Представление элемента в виде части SQL запроса.
   */
  protected static function getOperator(){
    return 'OR';
  }
}
