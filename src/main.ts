import "./style.css";
import { Subscription, from } from "rxjs";
import { map } from "rxjs/operators";

import db from "./rxdb.ts";

// Create an array of subscriptions to unsubscribe from later
const subscriptions: Subscription[] = [];

// Create an Observable from the database
const scientists$ = from(db.scientists.find().$);

// Subscribe to a stream for all scientists
const allScientistsSub: Subscription = scientists$.subscribe((data) => {
  displayScientists(data, document.querySelector<HTMLDivElement>("#scientists")!);
});
// adds the subscription to the list of subscriptions
subscriptions.push(allScientistsSub);

// We can resuse an observable by piping them into others
// Create an Observable that only contains Nobel Laureates
const nobelLaureates$ = scientists$.pipe(
  map((awardedScientists) => awardedScientists.filter((scientist) => scientist.wasNobelLaureate))
);

// Subscribe to a stream that only contains Nobel Laureates
let nobelLaureatesSub: Subscription = nobelLaureates$.subscribe(laureates => {
  displayScientists(laureates, document.querySelector<HTMLDivElement>("#laureates")!);
});
subscriptions.push(nobelLaureatesSub);

// Create a card to display the scientists in the UI
function displayScientists(scientists: any[], card: HTMLDivElement) {
  const scientistList = scientists
    .map(
      (scientist) => `
        <div class="card">
            <h2>${scientist.name}</h2><br>
            <strong>Contribution:</strong> ${scientist.contribution}<br>
            <strong>Was Nobel Lauriet:</strong> ${scientist.wasNobelLaureate}<br>
            <strong>Date:</strong> ${scientist.dateOfMajorAward || "N/A"}<br>
            <strong>Published:</strong> ${scientist.publishedPapersCount || "N/A"}<br>
            <strong>Awards:</strong> ${scientist.awards && scientist.awards.length > 0 ? scientist.awards.join(", ") : "N/A"}<br>
            <strong>Contributions:</strong><br> Field: ${scientist.contributionDetails.field}<br>Role: ${scientist.contributionDetails.specificRole}
        </div>
`,
    )
    .join("");

  card.innerHTML = scientistList;
}

// Unsubscribe from all subscriptions to prevent memory leaks
window.addEventListener('beforeunload', () => {
  for (const subscription of subscriptions) {
    subscription.unsubscribe();
  }
});

