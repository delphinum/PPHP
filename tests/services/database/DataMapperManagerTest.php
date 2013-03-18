<?php
namespace PPHP\tests\services\database;

spl_autoload_register(function($className){
  require_once $_SERVER['DOCUMENT_ROOT'] . '/' . str_replace('\\', '/', $className) . '.php';
});

/**
 * Generated by PHPUnit_SkeletonGenerator on 2012-07-06 at 19:45:28.
 */
class DataMapperManagerTest extends \PHPUnit_Framework_TestCase{
  /**
   * @var \PPHP\services\database\DataMapperManager
   */
  protected $object;

  /**
   * Sets up the fixture, for example, opens a network connection.
   * This method is called before a test is executed.
   */
  protected function setUp(){
    $this->object = \PPHP\services\database\DataMapperManager::getInstance();
  }

  /**
   * Tears down the fixture, for example, closes a network connection.
   * This method is called after a test is executed.
   */
  protected function tearDown(){
  }

  /**
   * @covers PPHP\services\database\DataMapperManager::getInstance
   */
  public function testGetInstance(){
    $object = \PPHP\services\database\DataMapperManager::getInstance();
    $this->assertInstanceOf('\PPHP\services\database\DataMapperManager', $object);
    $this->assertTrue($object === $this->object);
  }

  /**
   * @covers PPHP\services\database\DataMapperManager::getNewDataMapper
   */
  public function testGetNewDataMapper(){
    $mapper = $this->object->getNewDataMapper();
    $this->assertFalse($mapper === $this->object->getNewDataMapper());
    $this->assertInstanceOf('\PPHP\tools\classes\standard\storage\database\DataMapper', $mapper);
  }

  /**
   * @covers PPHP\services\database\DataMapperManager::getDataMapper
   */
  public function testGetDataMapper(){
    $this->assertInstanceOf('\PPHP\tools\classes\standard\storage\database\DataMapper', $this->object->getDataMapper());
  }
}