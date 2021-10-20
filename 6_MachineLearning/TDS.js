/*
 *  TIPJS: Tools for Image(J) Processing JavaScript
 *  Copyright (C) 2018  Jean-Christophe Taveau.
 *
 *  This file is part of TIPJS, module TDS
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,Image
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with TIPJS.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */
 
'use strict';

/* 
 * Tiny DataSet Helper Functions 
 * 2018/10/18
 * Jean-Christophe Taveau
 */
function TDS() {
  this._data;
  this._order;
}

TDS.fromCSV = (data_csv,sep=',') => {
  let rows = data_csv.split('\n').filter( r => r.indexOf(sep) !== -1);
  let headers = rows[0].split(sep);
  if (headers[0] === ' ') {
    headers[0] = 'ID';
  }
  let table = new TDS();
  table._data = rows.slice(1).map(row => {
    let words = row.split(sep);
    return headers.reduce( (obj,h,i) => {
      obj[h] = (!isNaN(parseFloat(words[i])) && isFinite(words[i]) ) ? parseFloat(words[i]) : words[i];
      return obj;
    }, 
    {});
  });
  table._order = 'row';
  return table;
}

TDS.toCSV = (sep=',') => {
  // Headers
  let str = Object.keys(data[0]).reduce( (accu,key,i) => `${accu}${(i===0) ? '' : sep}${key}`,'') + '\n';
  // Values
  return str + this.data.map( d => Object.keys(d).reduce( (accu,h,i) => `${accu}${ (i===0) ? '' : sep }${d[h]}`,'') + '\n').join('');
}

// Read a CSV file into a dataset (Array of data objects)
TDS.fromFile = (filename,sep=',') => {
  let file = new File(fileName);
  let fr = new FileReader(file);
  let br = new BufferedReader(fr);
  let line;
  let txt='';
  while((line = br.readLine()) != null){
      //process the line
      txt+=line + '\n';
  }
  return TDS.fromCSV(txt,sep);
};
    
// Convert IJ Table into a dataset (Array of data objects)
TDS.fromTableIJ = (tableij) => {
  let headings = Java.from(tableij.getHeadings());
  let numcolumns = tableij.getRowAsString(0).split(/[\t,]/).length;
  if (headings.length !== numcolumns) {
    headings.unshift('ID');
  }
  let table = new TDS();
  table._order = "row";
  table._data = Array.from(
    {length: tableij.size()},
    (v,i) => {
      let values = tableij.getRowAsString(i).split(/[\t,]/);
      return headings.reduce ( (accu,h,j) => {
        accu[h] = +values[j];
        return accu;
      },{}) 
    }
  );
  return table;
};
    
TDS.prototype = {
  get length() {
    return this._data.length;
  }
}
// Helper function
TDS.prototype.vector = (index) => this._data[index];
    
// Helper function
TDS.prototype.slice = (start,end) => {
  let output = new TDS();
  output._order = this._order;
  output._data = this._data.slice(start,end);
  return output;
}
    
// Clean data by filtering only specific features.
TDS.prototype.filter = (func) => {
  let table = new TDS();
  table._data = this._data.map(func);
  table._order = this._order;
  return table;
};
    
// Helper function
TDS.byFeatures = (features) => (datum,index) => {
  return features.reduce( (accu,f) => {
    accu[f] = datum[f];
    return accu;
  },{});
};
    
// Extract column(s) as an object of arrays
TDS.prototype.columns = (headers) => {
  let self = this;
  let table = new TDS();
  table._data = headers.reduce( (accu,h) => {
    accu[h] = self._data.map( (d) => d[h]);
    return accu;
  },{});
  table._order = 'column';
  return table;
};
    
// Display 
TDS.prototype.toString = () => {
  let self = this;
  return Object.keys(this._data).reduce( (accu,k,array) => `${accu}  ${k}: ${JSON.stringify(self._data[k])}\n`,'[\n') + ']'
};


