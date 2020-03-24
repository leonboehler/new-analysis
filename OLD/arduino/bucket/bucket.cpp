#include <EEPROM.h>

#include "bucket.h"

void setup()
{
    if(int(EEPROM.get(1)) == 0)
    {
        calibrate();
    }
}
void loop()
{
    while(true)
    {
        sendData(parseData(readSensor(), readVoltage()));
        dummySleep(time_deepsleep);
    }
}
void calibrate()
{
    calibrated_value = readSensor();
    EEPROM.put(1,1);
}
uint8_t readSensor()
{
    frogs += rand() % 2;
    return frogs;
}
float readVoltage()
{
    battery -= 0.01 * (rand() %5);
    return battery;
}
String parseData(uint8_t frogs, float volt)
{
    return (to_string(frogs)+";"+to_string(volt)+";"+to_string(bucket_id));
}
void sendData(String sendStr)
{
    dummy433Send(sendStr);
    bool received = false;
    chrono::seconds sleepTime(time_listen433);
    chrono::system_clock::time_point end = chrono::system_clock::now() + sleepTime;
    while(end > chrono::system_clock::now() && !received)
    {
        switch(dummy433Receive())
        {
            case 0: received = true;break; //nothing to do
            case 1: dummyRestart; received = true;break; //restart
            case 2: calibrate(); received = true;break;
            default: break;
        }
    }
}
