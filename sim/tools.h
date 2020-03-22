#include <fstream>
#include <iostream>

using namespace std;

// Delete n-th line from given file 
void delete_line(const char *file_name, int n) 
{ 
    cout << "delete_line" << endl;
    // open file in read mode or in mode 
    ifstream is(file_name); 
  
    // open file in write mode or out mode 
    ofstream ofs; 
    ofs.open("temp.txt", ofstream::out); 
  
    // loop getting single characters 
    string line; 
    int line_no = 1; 
    while (getline(is,line)) 
    { 
        // file content not to be deleted 
        if (line_no != n && line != "") 
            ofs << line + "\n"; 

        line_no++; 
    } 
  
    // closing output file 
    ofs.close(); 
  
    // closing input file 
    is.close(); 
  
    // remove the original file 
    remove(file_name); 
  
    // rename the file 
    rename("temp.txt", file_name); 
} 