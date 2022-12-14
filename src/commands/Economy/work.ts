import { Command } from "../../structures/Command";
import { Economy } from "../../models/economy";
import { EmbedBuilder } from "discord.js";
import ms from "ms";

// ๐ฎโโ๏ธ๐ต๏ธ๐โโ๏ธ๐ฅท๐ทโโ๏ธ๐จโโ๏ธ๐จโ๐ซ๐จโ๐พ๐จโ๐ณ๐จโ๐ง๐จโ๐ญ๐จโ๐ฌ๐จโ๐ป๐จโ๐จ๐จโโ๏ธ
const jobList = [
    "๐ฎโโ๏ธ Policjant",
    "๐ต๏ธ Detektyw",
    "๐โโ๏ธ Straลผnik",
    "๐ฅท Najemnik",
    "๐ทโโ๏ธ Budowniczy",
    "๐จโโ๏ธ Lekarz",
    "๐จโ๐ซ Nauczyciel",
    "๐จโ๐พ Rolnik",
    "๐จโ๐ณ Kucharz",
    "๐จโ๐ง Mechanik",
    "๐จโ๐ญ Robotnik",
    "๐จโ๐ฌ Naukowiec",
    "๐จโ๐ป Programista",
    "๐จโ๐จ Artysta",
    "๐จโโ๏ธ Pilot",
]

export default new Command({
    name: "pracuj",
    description: "๐จโ๐ผ Pracujesz i zarabiasz pieniฤdze",
    run: async ({ interaction, client }) => {

        const user = interaction.user;

        const db = await Economy.findOne({ userId: user.id }) || await Economy.create({ userId: user.id });

        const job = jobList[Math.floor(Math.random() * jobList.length)];

        const amount = Math.floor(Math.random() * (500 + (Math.random() * ((db.wallet + db.bank) * 0.05)))) + 300 ;


        if(db.cooldowns.work.getTime() > Date.now()) {
            const time = new Date(db.cooldowns.work.getTime() - Date.now()).toISOString().slice(11, 19);
            return interaction.followUp(`โฑ Musisz odczekaฤ **${ms(db.cooldowns.work.getTime() - Date.now())}** przed ponownym uลผyciem tej komendy!`);
        }

        db.wallet += amount;
        db.cooldowns.work = new Date((new Date()).getTime() + 1000 * 60 * 60);
        db.save();

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Praca", iconURL: user.displayAvatarURL() })
            .setDescription(`๐จโ๐ผ Pracowaลeล jako \`${job.split(" ")[0]}\` ${job.split(" ")[1]} i zarobiลeล ${amount} ๐ธ`)
            .setColor("LuminousVividPink")
            .setTimestamp()

        interaction.followUp({ embeds: [embed] });

    }
})

