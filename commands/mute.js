module.exports.run = async (Discord, client, m, args) => {

    if (m.member.hasPermission("KICK_MEMBERS")) {
      console.log(m.mentions)
        if(!m.mentions.users[0]){
            return m.channel.send("specify a user to mute")
        }
m.mentions.users[0].addRole('544593174895656961')
          m.channel.send(m.mentions[0].username + " muted.");
  
      } else {
        m.channel.send("You don't have permission to mute");
      }

}

module.exports.command = {
  name:"mute",
}