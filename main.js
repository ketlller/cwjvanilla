// main.js

const serverUrl = "https://njrsuqvjdnnl.usemoralis.com:2053/server";
const appId = "aae8fq0TOpGzRaIcjpcBMXSpshcM9M4hx18GmLR7";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Welcome to CodeWithJoe" })
      console.log(user)
      console.log(user.get('ethAddress'))
     populate()
   } catch(error) {
     console.log(error)
   }
  }
}

async function populate(){
  const balances = await Moralis.Web3API.account.getTokenBalances({chain: "bsc"}).then(buildTableBalances);
  console.log(balances)
}

function buildTableBalances(data){

document.getElementById("resultBalances").innerHTML = `<table class="table table-dark table-striped" id="balancesTable">
                                                        </table>`;
const table = document.getElementById("balancesTable");
const rowHeader = `<thead>
                        <tr>
                            <th>Token</th>
                            <th>Symbol</th>
                            <th>Balance</th>
                            <th>Decimals</th>
                        </tr>
                    </thead>`
table.innerHTML += rowHeader;
for (let i=0; i < data.length; i++){
  
    let row = `<tr>
                    <td>${data[i].name}</td>
                    <td>${data[i].symbol}</td>
                    <td>${Moralis.Units.FromWei(data[i].balance,data[i].decimals )}</td>
                    <td>${data[i].decimals}</td>
                </tr>`
    table.innerHTML += row
}
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
