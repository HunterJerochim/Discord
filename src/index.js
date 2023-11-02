import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import orderCommand from "./commands/order.js";
import rolesCommand from "./commands/roles.js";
import usersCommand from "./commands/user.js";
import channelsCommand from "./commands/channel.js";
import buttonCommand from "./commands/button.js";

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.login(TOKEN);

client.on("ready", () => console.log(`${client.user.tag} has logged in!`));

/* in this particular client.on method "interactionCreate is checking to see if the interaction is an "isChatInputCommannd". If it is
then the bot will send a reply to the input from the user */

/* below we are going to add "arguments" and or "OPTIONS" for our slash command */

/* client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const foodName = interaction.options.get("food").value;
    const imageUrl = await fetchFoodImage(foodName);

    if (imageUrl) {
      interaction.reply({
        content: `You ordered ${foodName}`,
        embeds: [
          {
            image: {
              url: imageUrl,
            },
          },
        ],
      });
    } else {
      interaction.reply({
        content: `Sorry, we couldn't find and image for that ${foodName}`,
      });
    }
  }
}); */

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const foodName = interaction.options.get("food").value;
    const drinkName = interaction.options.get("drink").value;

    interaction.reply({
      content: `You ordered ${foodName} & ${drinkName}`,
    });
  }
});

// ----------------- Here is your fetch statement for tomorrow ---------- //-------

/* async function fetchFoodImage(foodName) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
        foodName
      )}&apiKey=${SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].image;
    }
    return null;
  } catch (error) {
    console.error("Error fetching food image:", error);
    return null;
  }
} */

/* `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(foodName)}&apiKey=${SPOONACULAR_API_KEY}` */

/* 
- in this async function that is allowing us to use slash commands 
- we are sending the commands variable to the 'Routes.applicationGuildCommands' to register/PUT(update existing resource) a new command 
- this is where we submit the slash command 
*/

/*
  Below you can find the option attributes that you can use inside of the discord devloper portal and look at 
  "Application Command Option Structure"
  Also you can find the "option type" under "Application Command Option Type"
*/

/*
  I wanted to challenge myself and try to make it so that when the user orders a certain food it replys with 
  "You ordered ${the name of the food}" & it sends a picture of the specific food you ordered as well
  use spoonacular API possibly
*/
async function main() {
  // ------------------------------ This "commands" variable has already been converted to the above code ------------------------------ //

  /* const commands = [
    {
      name: "order",
      description: "Order something...",
      options: [
        {
          name: "food",
          description: "the type of food",
          type: 3,
          required: true,
          choices: [
            {
              name: "Cake",
              value: "cake",
            },
            {
              name: "Cheeseburger",
              value: "cheeseburger",
            },
          ],
        },
        {
          name: "drink",
          description: "the type of drink",
          type: 3,
          required: true,
          choices: [
            {
              name: "Water",
              value: "water",
            },
            {
              name: "Coca-Cola",
              value: "coca-cola",
            },
            {
              name: "Sprite",
              value: "sprite",
            },
          ],
        },
      ],
    },
  ]; */

  const commands = [
    orderCommand,
    rolesCommand,
    usersCommand,
    channelsCommand,
    buttonCommand,
  ];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    // client login TOKEN
  } catch (err) {
    console.log(err);
  }
}

main();
/* fetchFoodImage(); */

// here we are passing the message object //

/* client.on("messageCreate", (message) => {
  console.log(message.content);
  console.log(`Message was created: ${message.createdAt.toDateString()}`);
  console.log(`Message was created by: ${message.author.tag}`);
});

// this event listener will log the name of the channel that was just created //

client.on("channelCreate", (channel) => {
  console.log(channel.name);
});

// ask about gitignore file for storing token //

/*note: when you register an event inside of discord it takes 2 parameters. the first parameter is the 
name of the eventa dn the second parameter is the event handler function or call back function or anonymous function */

// to interact with discord API you need to install "npm i @discordjs/rest" // */

/*
if (interaction.commandName === "button") {
  interaction.reply({ content: "Play!" });
}
*/
