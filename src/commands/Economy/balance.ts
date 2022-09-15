import { Command } from "../../structures/Command";
import { Economy } from "../../models/economy";
import { EmbedBuilder } from "discord.js";

export default new Command({
    name: "balans",
    description: "💳 Pokazuje twój stan konta",
    run: async ({ interaction, client }) => {

        const user = interaction.user;

        const db = await Economy.findOne({ userId: user.id }) || await Economy.create({ userId: user.id });

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Balans", iconURL: user.displayAvatarURL() })
            .addFields(
                { name: "Portfel 💸⠀⠀", value: `${db.wallet}`, inline: true },
                { name: "Bank 💳", value: `${db.bank}`, inline: true },
            )
            .setColor("LuminousVividPink")
            .setTimestamp()

        interaction.followUp({ embeds: [embed] });
    }
})