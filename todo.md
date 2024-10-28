<!-- - send socket event for decline friend req -->

<!-- - unfriend -->

<!-- - when user is added, update the messages list -->

- text chat functionality(
  save the messages in the conversation db, load the conversation to get the message
  )
- voice chat, video chat
- emojis
- send other files
- profile page
- stories of users
- notifications

<!-- ekta user message send korle oita db er message e giye save hobe, ebong, user er conversation model e populate hobe oi message ta, conversation model e ekta object id add hobe and oi id diye tule anbe message from message db -->


<!-- friend added to conversation behavior tracking -->

when user adds a friend to conversation
this happens
add a new id to users conv field
add a new conv in conv schema


steps of chatting
-> when user 1 sends a message, add a message to the message db
-> take that id and push inside that conversations messages array, invalidate myself
-> socket to invalidate the receiver


<!-- TODO: CAN SEND MESSAGE BUT INVALIDATION BUG OCCURING -->