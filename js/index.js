class Lab5Client {
  constructor() {
    this.init();
  }

  init() {
    this.insertButton = document.getElementById('insertButton');
    this.queryTextarea = document.getElementById('query');
    this.submitButton = document.getElementById('submitButton');
    this.errorMessage = document.getElementById('errorMessage'); // Add this line

    this.insertButton.onclick = () => this.insertData();
    this.submitButton.onclick = () => this.handleQuery();
  }

  handleQuery() {
    const query = this.queryTextarea.value.trim();
    if (query.toLowerCase().startsWith('insert')) {
      this.executeInsertQuery();
    } else if (query.toLowerCase().startsWith('select')) {
      this.executeQuery();
    } else {
      this.executeInsertQuery();
    }
  }

  insertData() {
    const patients = [
      { name: 'Sara Brown', dateOfBirth: '1901-01-01' },
      { name: 'John Smith', dateOfBirth: '1941-01-01' },
      { name: 'Jack Ma', dateOfBirth: '1961-01-30' },
      { name: 'Elon Musk', dateOfBirth: '1999-01-01' }
    ];

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://comp-4537-lab5-hosted-server2.vercel.app/insert');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        document.getElementById("insertResponse").innerHTML = xhr.responseText;
        console.log(xhr.responseText);
      } else {
        console.error(ERROR, xhr.statusText);
      }
    }.bind(this); // Bind the function to maintain the context
    xhr.onerror = function () {
      console.error(FAIL);
    };
    xhr.send(JSON.stringify(patients));
  }

  executeQuery() {
    const query = encodeURIComponent(this.queryTextarea.value);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://comp-4537-lab5-hosted-server2.vercel.app/query?query=${query}`);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const formattedResponse = JSON.stringify(response, null, 2); // 2-space indentation
        document.getElementById("executeResponse").innerHTML = formattedResponse;
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.error(ERROR, xhr.statusText);
      }
    }.bind(this); // Bind the function to maintain the context
    xhr.onerror = function () {
      console.error(FAIL);
    };
    xhr.send();
  }

  executeInsertQuery() {
    const query = encodeURIComponent(this.queryTextarea.value);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://comp-4537-lab5-hosted-server2.vercel.app/insert');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const message = response.message;
        document.getElementById("executeResponse").innerText = message; // Display the response
        console.log(response);
      } else {
        document.getElementById("executeResponse").innerText = NOTALLOWED; // Display error message
        console.error(ERROR, xhr.statusText);
      }
    }.bind(this); // Bind the function to maintain the context
    xhr.onerror = function () {
      console.error(FAIL);
    };
    xhr.send(JSON.stringify({ query })); // Send the query as JSON in the request body

  }
}

const client = new Lab5Client();

