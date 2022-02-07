import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "../../src/aws-exports";
import { createTodo } from "../../src/graphql/mutations";
import { onCreateTodo } from "../../src/graphql/subscriptions";

Amplify.configure(awsconfig);

async function createNewTodo() {
  const todo = {
    name: "Use AppSync",
    description: `Realtime and Offline (${new Date().toLocaleString()})`,
  };

  return await API.graphql(graphqlOperation(createTodo, { input: todo }));
}

const MutationButton = document.getElementById("MutationEventButton");
const MutationResult = document.getElementById("MutationResult");
const QueryResult = document.getElementById("QueryResult");
const SubscriptionResult = document.getElementById("SubscriptionResult");

MutationButton.addEventListener("click", (evt) => {
  createNewTodo().then((evt) => {
    MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
  });
});

+API.graphql(graphqlOperation(onCreateTodo)).subscribe({
    next: (evt) => {
     const todo = evt.value.data.onCreateTodo;
     SubscriptionResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
    },
  });
  
getData();