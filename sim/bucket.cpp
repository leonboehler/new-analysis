#include "bucket.h"

int main(int argc, char ** argv) //setup()
{
    cout << "main" << endl;
    if(dummyReadMemory(1) == 0)
    {
        calibrate();
    }
    loop();
    return 0;
}
void loop()
{
    cout << "loop" << endl;
    while(true)
    {
        sendData(parseData(readSensor(), readVoltage()));
        dummySleep(time_deepsleep);
    }
}
void calibrate()
{
    cout << "calibrate" << endl;
    dummyWriteMemory(1,1);
    return;
}
uint8_t readSensor()
{
    cout << "readSensor" << endl;
    return rand() % 10;
}
float readVoltage()
{
    cout << "readVoltage" << endl;
    return 3.7;
}
string parseData(uint8_t frogs, float volt)
{
    cout << "parseData" << endl;
    
    return (to_string(frogs)+";"+to_string(volt)+";"+to_string(bucket_id));
}
void sendData(string sendStr)
{
    cout << "sendData" << endl;
    dummy433Send(sendStr);
    bool received = false;
    chrono::seconds sleepTime(time_listen433);
    chrono::system_clock::time_point end = chrono::system_clock::now() + sleepTime;
    while(end > chrono::system_clock::now() && !received)
    {
        switch(dummy433Receive())
        {
            case 0: received = true;break; //nothing to do
            case 1: received = true;break; //restart
            case 2: calibrate(); received = true;break;
            default: break;
        }
    }
}

// dummy Klassen um Arduino Funktionen zu ersetzten
void dummySleep(uint8_t sleep)
{
    cout << "dummySleep" << endl;
    chrono::minutes sleepTime(sleep);
    this_thread::sleep_for(sleepTime);
}
void dummy433Send(string sendStr)
{
    cout << "dummy433Send" << endl;
    ofstream myfile;
    myfile.open ("send.txt",std::ofstream::out | std::ofstream::app);
    myfile << sendStr +"\n";
    myfile.close();
}
uint8_t dummy433Receive()
{
    cout << "dummy433Receive" << endl;
    string line;
    ifstream myfile ("receive.txt");
    if (myfile.is_open())
    {   
        bool found = false;
        uint16_t count = 1;
        while ( getline (myfile,line) )
        {
            if(line.find(to_string(bucket_id)) != std::string::npos)
            {
                found = true;
                break;
            }
            count++;
        }
        myfile.close();
        if(found)
        {
            delete_line("receive.txt",count);
            return stoi(line.substr(0,1));
        }
    }
    else 
        cout << "Unable to open file";     
    return 0; 
}
void dummyWriteMemory(uint16_t addr, uint8_t val)
{
    cout << "dummyWriteMemory" << endl;
    ofstream myfile;
    myfile.open (to_string(bucket_id)+"_memory.txt");
    myfile << to_string(val) +"\n";
    myfile.close();
}
uint8_t dummyReadMemory(uint16_t addr)
{
    cout << "dummyReadMemory" << endl;
    string line;
    ifstream myfile (to_string(bucket_id)+"_memory.txt");
    if (myfile.is_open())
    {
        getline (myfile,line);
        myfile.close();
        if(line == "")
            return 0;
        else
            return stoi(line);
    }
    else cout << "Unable to open file"; 
    return 0;
}