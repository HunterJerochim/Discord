import { SlashCommandBuilder } from "@discordjs/builders";

const channelsCommand = new SlashCommandBuilder()
  .setName("channels")
  .setDescription("channels cmd")
  .addChannelOption((option) =>
    option.setName("channels").setDescription("channels").setRequired(true)
  )
  .addBooleanOption((option) =>
    option
      .setName("deletemsg")
      .setDescription("Delete the messages")
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option.setName("age").setDescription("Enter your age")
  );

// you can use the Application Command Option Type "addAttachmentOption" to send files as well //

export default channelsCommand.toJSON();
