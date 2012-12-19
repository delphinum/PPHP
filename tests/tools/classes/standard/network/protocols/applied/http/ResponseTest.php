<?php
namespace PPHP\tests\tools\classes\standard\network\protocols\applied\http;

spl_autoload_register(function($className){
  require_once $_SERVER['DOCUMENT_ROOT'] . '/' . str_replace('\\', '/', $className) . '.php';
});
/**
 * Generated by PHPUnit_SkeletonGenerator on 2012-12-14 at 21:47:45.
 */
class ResponseTest extends \PHPUnit_Framework_TestCase{
  /**
   * @var \PPHP\tools\classes\standard\network\protocols\applied\http\Response
   */
  protected $object;

  /**
   * Sets up the fixture, for example, opens a network connection.
   * This method is called before a test is executed.
   */
  protected function setUp(){
    $this->object = new \PPHP\tools\classes\standard\network\protocols\applied\http\Response(200, 'OK');
    $this->object->addParameterHeaderStr('nameA', 'valueA');
    $this->object->addParameterHeaderStr('nameB', 'valueB');
    $this->object->setBody('test body');
  }

  /**
   * Tears down the fixture, for example, closes a network connection.
   * This method is called after a test is executed.
   */
  protected function tearDown(){
  }

  /**
   * @covers PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish
   */
  public function testReestablish(){
    $request = \PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish('HTTP/1.1 200 OK test' . PHP_EOL . 'Content-Type:text/html' . PHP_EOL . 'Content-Length:4' . PHP_EOL . PHP_EOL . 'test');
    $this->assertEquals('200', $request->getCode());
    $this->assertEquals('OK test', $request->getMessage());
    $this->assertEquals('text/html', $request->getHeader()->getParameterValue('Content-Type'));
    $this->assertEquals('test', $request->getBody());

    $request = \PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish('HTTP/1.1 200 OK' . PHP_EOL . PHP_EOL);
    $this->assertEquals('200', $request->getCode());
    $this->assertEquals('OK', $request->getMessage());
    $this->assertEquals('Cache-Control:no-cache'.PHP_EOL.'Connection:close'.PHP_EOL, $request->getHeader()->interpretation());
    $this->assertEquals(null, $request->getBody());

    $this->setExpectedException('\PPHP\tools\classes\standard\baseType\exceptions\NotFoundDataException');
    \PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish('HTTP/1.1 200 OK' . PHP_EOL);
    \PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish('HTTP/1.1 200' . PHP_EOL.PHP_EOL);
    \PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish('HTTP/1.1 OK' . PHP_EOL.PHP_EOL);
    \PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish('200 OK' . PHP_EOL.PHP_EOL);
    \PPHP\tools\classes\standard\network\protocols\applied\http\Response::reestablish('HTTP/1.1 200 OK' . PHP_EOL.PHP_EOL.'test');
  }

  /**
   * @covers PPHP\tools\classes\standard\network\protocols\applied\http\Response::interpretation
   */
  public function testInterpretation(){
    $this->assertEquals('HTTP/1.1 200 OK'.PHP_EOL.'Cache-Control:no-cache'.PHP_EOL.'Connection:close'.PHP_EOL.'nameA:valueA' . PHP_EOL . 'nameB:valueB' . PHP_EOL.'Content-Type:text/html;charset=utf-8'.PHP_EOL.'Content-Length:9'.PHP_EOL.'Content-MD5:bbf9afe7431caf5f89a608bc31e8d822'.PHP_EOL.PHP_EOL.'test body', $this->object->interpretation());
    $response = new \PPHP\tools\classes\standard\network\protocols\applied\http\Response(200, 'OK', null, ['nameA' => 'valueA test', 'nameB' => 'valueB']);
    $this->assertEquals('HTTP/1.1 200 OK'.PHP_EOL.'Cache-Control:no-cache'.PHP_EOL.'Connection:close'.PHP_EOL.'Content-Type:text/html;charset=utf-8'.PHP_EOL.'Content-Length:33'.PHP_EOL.'Content-MD5:ebe40b5244561ef68d8f19d781a91abb'.PHP_EOL.PHP_EOL.'nameA:valueA test'.PHP_EOL.'nameB:valueB'.PHP_EOL, $response->interpretation());
  }

  /**
   * @covers PPHP\tools\classes\standard\network\protocols\applied\http\Response::getCode
   */
  public function testGetCode(){
    $this->assertEquals('200', $this->object->getCode());
  }

  /**
   * @covers PPHP\tools\classes\standard\network\protocols\applied\http\Response::getMessage
   */
  public function testGetMessage(){
    $this->assertEquals('OK', $this->object->getMessage());
  }
}