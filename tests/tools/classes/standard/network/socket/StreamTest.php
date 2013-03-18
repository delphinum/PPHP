<?php
namespace PPHP\tests\tools\classes\standard\network\socket;

spl_autoload_register(function($className){
  require_once $_SERVER['DOCUMENT_ROOT'] . '/' . str_replace('\\', '/', $className) . '.php';
});
/**
 * Generated by PHPUnit_SkeletonGenerator on 2012-12-12 at 20:11:16.
 */
class StreamTest extends \PHPUnit_Framework_TestCase{
  /**
   * @var \PPHP\tools\classes\standard\network\socket\Stream
   */
  protected $object;

  /**
   * Sets up the fixture, for example, opens a network connection.
   * This method is called before a test is executed.
   */
  protected function setUp(){
  }

  /**
   * Tears down the fixture, for example, closes a network connection.
   * This method is called after a test is executed.
   */
  protected function tearDown(){
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::close
   * @expectedException PHPUnit_Framework_Error_Warning
   */
  public function testClose(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $clientStream->close();
    $clientStream->write('data');
    $serverSocket->shutdown();
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::isClose
   */
  public function testIsClose(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $this->assertFalse($clientStream->isClose());
    $clientStream->close();
    $this->assertTrue($clientStream->isClose());
    $serverSocket->shutdown();
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::read
   * @covers PPHP\tools\classes\standard\network\socket\Stream::write
   * @expectedException PHPUnit_Framework_Error_Warning
   */
  public function testRead(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $serverStream = $serverSocket->accept();
    $clientStream->write('data');
    $this->assertEquals('d', $serverStream->read());
    $serverStream->read();
    $serverStream->read();
    $serverStream->read();
    $this->assertFalse($serverStream->read());
    $serverSocket->shutdown();
    $clientStream->close();
    $serverStream->close();
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::readString
   * @expectedException PHPUnit_Framework_Error_Warning
   */
  public function testReadString(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $serverStream = $serverSocket->accept();
    $clientStream->write('data');
    $this->assertEquals('da', $serverStream->readString(2));
    $this->assertEquals('ta', $serverStream->readString(4));
    $this->assertFalse($serverStream->readString(1));
    $serverSocket->shutdown();
    $clientStream->close();
    $serverStream->close();
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::readLine
   * @expectedException PHPUnit_Framework_Error_Warning
   */
  public function testReadLine(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $serverStream = $serverSocket->accept();
    $clientStream->write('data');
    $this->assertEquals('data', $serverStream->readLine());
    $this->assertFalse($serverStream->readLine());
    $serverSocket->shutdown();
    $clientStream->close();
    $serverStream->close();
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::readAll
   * @expectedException PHPUnit_Framework_Error_Warning
   */
  public function testReadAll(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $serverStream = $serverSocket->accept();
    $clientStream->write('data');
    $this->assertEquals('data', $serverStream->readAll());
    $this->assertFalse($serverStream->readAll());
    $serverSocket->shutdown();
    $clientStream->close();
    $serverStream->close();
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::getIn
   */
  public function testGetIn(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $this->assertInstanceOf('\PPHP\tools\classes\standard\network\socket\inStream', $clientStream->getIn());
    $serverSocket->shutdown();
    $clientStream->close();
  }

  /**
   * @covers PPHP\tools\classes\standard\network\socket\Stream::getOut
   */
  public function testGetOut(){
    $serverSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $clientSocket = new \PPHP\tools\classes\standard\network\socket\Socket();
    $serverSocket->listen('localhost', 10000);

    $clientStream = $clientSocket->connect('localhost', 10000);
    $this->assertInstanceOf('\PPHP\tools\classes\standard\network\socket\outStream', $clientStream->getOut());
    $serverSocket->shutdown();
    $clientStream->close();
  }
}