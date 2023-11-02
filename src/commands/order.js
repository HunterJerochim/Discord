import { SlashCommandBuilder } from  "@discordjs/builders";

const orderCommand = new SlashCommandBuilder()
  .setName("order") // <-- Here
  .setDescription("order your favorite meal!") // <-- And here
  .addStringOption((option) =>
    option
      .setName("food")
      .setDescription("Select your favorite food")
      .setRequired(true)
      .addChoices(
        {
          name: "Pizza",
          value: "pizza",
        },
        {
          name: "Hamburger",
          value: "hamburger",
        },
        {
          name: "Cake",
          value: "cake",
        }
      )
  )
  .addStringOption(
    (
      option // <-- Another here
    ) =>
      option
        .setName("drink")
        .setDescription("Select your favorite drink")
        .setRequired(true)
        .addChoices(
          {
            name: "Coke",
            value: "coke",
          },
          {
            name: "Sprite",
            value: "sprite",
          },
          {
            name: "Water",
            value: "water",
          }
        )
  );

  export default orderCommand.toJSON();
