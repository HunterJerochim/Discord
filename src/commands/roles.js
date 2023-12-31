import { SlashCommandBuilder } from "@discordjs/builders";

const rolesCommand = new SlashCommandBuilder()
  .setName("addrole")
  .setDescription("Add a role")
  .addRoleOption((option) =>
    option.setName("newrole").setDescription("Add the new role").setRequired(true)
  );

  export default rolesCommand.toJSON();