<?php
namespace PPHP\tools\patterns\database\query;

/**
 * Класс представляет SQL запрос для получение записей из таблицы.
 */
class Select implements ComponentQuery{
  /**
   * Множество полей, запрашиваемых в запросе.
   * @var \SplObjectStorage
   */
  private $fields;
  /**
   * Множество таблиц, используемых в запросе.
   * @var \SplObjectStorage
   */
  private $tables;

  /**
   * Множество соединений
   * @var \SplObjectStorage
   */
  private $joins;
  /**
   * Условие отбора записей.
   * @var Where
   */
  private $where;
  /**
   * Сортировка записей.
   * @var OrderBy
   */
  private $orderBy;
  /**
   * Ограничитель выборки.
   * @var Limit
   */
  private $limit;
  /**
   * Логический флаг, свидетельствующий о том, что должны быть выбраны все поля.
   * @var boolean
   */
  private $allField;

  function __construct(){
    $this->fields = new \SplObjectStorage();
    $this->tables = new \SplObjectStorage();
    $this->joins = new \SplObjectStorage();
    $this->allField = false;
  }

  /**
   * Метод добавляет поле в запрос.
   * @param Field $field Добавляемое поле.
   * @throws StandardException Выбрасывается в случае, если заданный компонент уже включен в запрос.
   */
  public function addField(Field $field){
    if($this->fields->offsetExists($field)){
      throw new StandardException('Ошибка дублирования компонента.');
    }
    $this->fields->attach($field);
  }

  /**
   * Метод добавляет поле с алиасом в запрос.
   * @param FieldAlias $field Добавляемое поле.
   * @throws StandardException Выбрасывается в случае, если заданный компонент уже включен в запрос.
   */
  public function addAliasField(FieldAlias $field){
    if($this->fields->offsetExists($field)){
      throw new StandardException('Ошибка дублирования компонента.');
    }
    $this->fields->attach($field);
  }

  /**
   * Метод добавляет таблицу в запрос.
   * @param Table $table Добавляемая таблица.
   * @throws StandardException Выбрасывается в случае, если заданный компонент уже включен в запрос.
   */
  public function addTable(Table $table){
    if($this->tables->offsetExists($table)){
      throw new StandardException('Ошибка дублирования компонента.');
    }
    $this->tables->attach($table);
  }

  /**
   * Метод добавляет соединение в запрос.
   * @param \PPHP\tools\patterns\database\query\Join $join Добавляемое соединение.
   * @throws StandardException Выбрасывается в случае, если данное соединение уже присутствует в запросе
   */
  public function addJoin(Join $join){
    if($this->joins->offsetExists($join)){
      throw new StandardException('Ошибка дублирования компонента.');
    }
    $this->joins->attach($join);
  }

  /**
   * Метод устанавливает условие отбора для запроса.
   * @param Where $where Условие отбора.
   */
  public function insertWhere(Where $where){
    $this->where = $where;
  }

  /**
   * Метод определяет порядок сортировки для запроса.
   * @param OrderBy $orderBy
   */
  public function insertOrderBy(OrderBy $orderBy){
    $this->orderBy = $orderBy;
  }

  /**
   * @param \PPHP\tools\patterns\database\query\Limit $limit
   */
  public function insertLimit(Limit $limit){
    $this->limit = $limit;
  }

  /**
   * Метод устанавливает флаг отбора всех полей.
   */
  public function addAllField(){
    $this->allField = true;
  }

  /**
   * Метод возвращает представление элемента в виде части SQL запроса.
   * @param string|null $driver Используемая СУБД.
   * @throws StandardException Выбрасывается в случае, если компонент запроса не имеет достаточно данных для формирования запроса.
   * @throws \PPHP\tools\classes\standard\baseType\exceptions\InvalidArgumentException Выбрасывается в случае, если значение аргумента имеет неверный тип.
   * @return string Представление элемента в виде части SQL запроса.
   */
  public function interpretation($driver = null){
    if(($this->fields->count() == 0 && !$this->allField) || $this->tables->count() == 0){
      throw new StandardException();
    }

    if($this->allField){
      $fieldsString = '*';
    }
    else{
      $fieldsString = '';
      foreach($this->fields as $field){
        $fieldsString .= $field->interpretation() . ',';
      }
      $fieldsString = substr($fieldsString, 0, strlen($fieldsString) - 1);
    }

    $tableString = '';
    foreach($this->tables as $table){
      $tableString .= '`' . $table->interpretation() . '`,';
    }
    $tableString = substr($tableString, 0, strlen($tableString) - 1);

    $joinString = '';
    foreach($this->joins as $join){
      $joinString .= $join->interpretation();
    }

    $whereString = (is_object($this->where)? $this->where->interpretation() : '');
    $orderByString = (is_object($this->orderBy)? $this->orderBy->interpretation() : '');

    // Формирование платформо-независимой выборки при отсутствии несовместимых элементов.
    if(empty($this->limit)){
      return trim('SELECT ' . $fieldsString . ' FROM ' . $tableString . ' ' . $joinString . ' ' . $whereString . ' ' . $orderByString);
    }
    // Формирования платформо-зависимой выборки при наличии несовместимых элементов.
    else{
      if(!is_string($driver) || empty($driver)){
        throw new \PPHP\tools\classes\standard\baseType\exceptions\InvalidArgumentException('string', $driver);
      }
      // { Обработка LIMIT элемента
      $limitString = $this->limit->interpretation($driver);
      $staticPartString = ' ' . $fieldsString . ' FROM ' . $tableString . ' ' . $joinString . ' ' . $whereString . ' ';

      switch($driver){
        case 'sqlsrv': // MS SQL Server
        case 'firebird': // Firebird
          return trim('SELECT ' . $limitString . $staticPartString . $orderByString);
        case 'oci': // Oracle
          return trim('SELECT ' . $staticPartString . ' AND (' . $limitString . ') ' . $orderByString);
        case 'mysql': // MySQL
        case 'pgsql': // PostgreSQL
        case 'ibm': // DB2
          return trim('SELECT ' . $staticPartString . $orderByString . ' ' . $limitString);
        default:
          throw new \PPHP\tools\classes\standard\baseType\exceptions\InvalidArgumentException;
      }
      // }
    }
  }
}
