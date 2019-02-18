module.exports.run = async (Discord, client, m, args) => {

    if (m.member.hasPermission("KICK_MEMBERS")) {
   
        if(!m.mentions.members.first()){
            return m.channel.send("specify a user to kick")
        }
        m.mentions[0].kick('kicked by a admin').then(() => {
            if(err){
                m.channel.send("user not found")
            }
          m.channel.send(m.mentions[0].username + " kicked.");
        });
      } else {
        m.channel.send("You don't have permission to kick.");
      }

}

module.exports.command = {
  name:"kick",
  info:"Add someone to your ticket"
}