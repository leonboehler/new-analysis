#include "station.h"

int main(int argc, char ** argv) //setup()
{
    if(debug) cout << "main" << endl;
    if(argc==3)
    {
        station_id = stoi(argv[1]);
        time_requestIntervall = stoi(argv[2]);
        if(debug) cout << "use sim parameter";
    }

    loop();
}
void loop()
{
    if(debug) cout << "loop" << endl;
    while(true)
    {
        chrono::minutes intervall(time_requestIntervall);
        chrono::system_clock::time_point end = chrono::system_clock::now() + intervall;
        chrono::seconds sleepTime(5);
        while(end > chrono::system_clock::now())
        {
            receiveData();
            // zum verhindern von prozessor dauerlast
            this_thread::sleep_for(sleepTime);
        }
        sendRequest(parseData());
    }
}

void receiveData()
{
    if(debug) cout << "receiveData" << endl;
    string returned = dummy433Receive();
    if(returned != "")
        bucket_data.push_back(returned);
}
float readVoltage()
{
    if(debug) cout << "readVoltage" << endl;
    battery -= 0.01 * (rand() %5);
    return battery;
}
string parseData()
{
    string reqStr = "\"slave_post_data\": { \"station_id\": "+to_string(station_id)+",\"battery\":"+to_string(readVoltage())+", buckets: [";
    for (vector<string>::iterator it = bucket_data.begin(); it != bucket_data.end(); ++it)
    {
        string frogs = it->substr(0,it->find(';'));
        it->replace(it->begin(),it->begin()+it->find(';')+1,"");
        string volt = it->substr(0,it->find(';'));
        it->replace(it->begin(),it->begin()+it->find(';')+1,"");
        string bucket_id = it->substr(0,it->find(';'));

        if(it != bucket_data.begin())
            reqStr += ",{";
        else
            reqStr += "{";
        reqStr += "\"forg_amount\":"+frogs+",\"bucket_id\":"+bucket_id+",\"battery\":"+volt+"}";
    }
    reqStr += "]}";

    bucket_data.clear();

    return reqStr;
}
void sendRequest(string req)
{
    if(debug) cout << "sendRequest" << endl;
    const char* response = dummySendRequest(req).c_str();

    // Document d;
    // d.Parse(response);
}

// dummy Funktionen um Arduino Funktionen zu ersetzten
void dummy433Send(string sendStr)
{
    if(debug) cout << "dummy433Send" << endl;
    ofstream myfile;
    myfile.open ("receive.txt",std::ofstream::out | std::ofstream::app);
    if (myfile.is_open())
    { 
        myfile << sendStr +"\n";
        myfile.close();
    }else if(debug) cout << "Unable to open request.txt"; 
}
string dummy433Receive()
{
    if(debug) cout << "dummy433Receive" << endl;
    string line;
    ifstream myfile ("send.txt");
    if (myfile.is_open())
    {   
        bool found = false;
        uint16_t count = 1;
        while ( getline (myfile,line) )
        {
            if(line != "")
            {
                found = true;
                break;
            }
            count++;
        }
        myfile.close();
        if(found)
        {
            delete_line("send.txt",count);
            return line;
        }
    }else if(debug) cout << "Unable to open send.txt";     

    return ""; 
}
string dummySendRequest(string req)
{
    if(debug) cout << "dummySendRequest" << endl;
    if(debug) cout << req << endl;

    http::Request request(request_URI);

    // send a get request
    const http::Response postResponse = request.send("POST", req, {"Content-Type: application/json"});
    string response = string(postResponse.body.begin(), postResponse.body.end()); // print the result
    if(debug) cout << response << endl;
 
    return response;
}
void dummyRestart()
{
    if(debug) cout << "dummyRestart" << endl;
}