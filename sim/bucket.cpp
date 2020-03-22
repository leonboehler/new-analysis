#include "bucket.h"

int main(int argc, char ** argv) //setup()
{
    if(debug) if(debug) cout << "main" << endl;
    
    if(argc==3)
    {
        bucket_id = stoi(argv[1]);
        time_deepsleep = stoi(argv[2]);
        if(debug) cout << "use sim parameter";
    }
    
    if(dummyReadMemory(1) == 0)
    {
        calibrate();
    }
    loop();
    return 0;
}
void loop()
{
    if(debug) cout << "loop" << endl;
    while(true)
    {
        sendData(parseData(readSensor(), readVoltage()));
        dummySleep(time_deepsleep);
    }
}
void calibrate()
{
    if(debug) cout << "calibrate" << endl;
    dummyWriteMemory(1,1);
    return;
}
uint8_t readSensor()
{
    if(debug) cout << "readSensor" << endl;
    frogs += rand() % 2;
    return frogs;
}
float readVoltage()
{
    if(debug) cout << "readVoltage" << endl;
    battery -= 0.01 * (rand() %5);
    return battery;
}
string parseData(uint8_t frogs, float volt)
{
    if(debug) cout << "parseData" << endl;
    
    return (to_string(frogs)+";"+to_string(volt)+";"+to_string(bucket_id));
}
void sendData(string sendStr)
{
    if(debug) cout << "sendData" << endl;
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

// dummy Klassen um Arduino Funktionen zu ersetzten
void dummySleep(uint8_t sleep)
{
    if(debug) cout << "dummySleep" << endl;
    chrono::minutes sleepTime(sleep);
    this_thread::sleep_for(sleepTime);
}
void dummy433Send(string sendStr)
{
    if(debug) cout << "dummy433Send" << endl;
    ofstream myfile;
    myfile.open ("send.txt",std::ofstream::out | std::ofstream::app);
    if (myfile.is_open())
    {
        myfile << sendStr +"\n";
        myfile.close();
    }else if(debug) cout << "Unable to open send.txt"; 
}
uint8_t dummy433Receive()
{
    if(debug) cout << "dummy433Receive" << endl;
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
    }else if(debug) cout << "Unable to open receive.txt";   

    return 0; 
}
void dummyWriteMemory(uint16_t addr, uint8_t val)
{
    if(debug) cout << "dummyWriteMemory" << endl;
    ofstream myfile;
    myfile.open (to_string(bucket_id)+"_memory.txt");
    if (myfile.is_open())
    {
        myfile << to_string(val) +"\n";
        myfile.close();
    }else if(debug) cout << "Unable to open "+to_string(bucket_id)+"_memory.txt"; 
}
uint8_t dummyReadMemory(uint16_t addr)
{
    if(debug) cout << "dummyReadMemory" << endl;
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
    }else if(debug) cout << "Unable to open "+to_string(bucket_id)+"_memory.txt"; 

    return 0;
}
void dummyRestart()
{
    if(debug) cout << "dummyRestart" << endl;
}
