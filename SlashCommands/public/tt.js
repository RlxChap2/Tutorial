const {
  SlashCommandBuilder,
  ComponentType,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ActionRowBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("tt").setDescription("Modal Submit"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} interaction
   */
  async execute(interaction, client) {
    const NewModal = new ModalBuilder()
      .setCustomId("fmodal")
      .setTitle("New Modal");

    const NewTextField = new TextInputBuilder()
      .setCustomId("ftext")
      .setLabel("What's your favorite color?")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Red, Orange, Blue");

    const NewTextField2 = new TextInputBuilder()
      .setCustomId("fhp")
      .setLabel("What's your favorite hobby?")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("hobby");

    const row = new ActionRowBuilder().addComponents(NewTextField);
    const row2 = new ActionRowBuilder().addComponents(NewTextField2);

    NewModal.addComponents(row, row2);

    await interaction.showModal(NewModal);

    const filter = (i) => i.customId === "fmodal";
    interaction
      .awaitModalSubmit({ filter, time: 60000 })
      .then((i) => {
        i.reply({ content: "Worked" });
        console.log(`${i.customId} was submitted!`);
      })
      .catch(console.error);
  },
};
