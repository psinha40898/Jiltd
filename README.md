# recent log (older notes stored locally only)
## 8/27 GiftedChat
### Pros
- Velocity for development
- _Technically_ Cross Compatible
### Cons
- Lackluster android capabilities
- Scrolling Keyboard component throws VirtualizedLists Error
- Regular Keyboard component does not support touch dismissal on Android (works fine on iOS)
- The classic workaround of using regular Keyboard component with TouchableWithoutFeedback creates buggy scrolling
### Takeaways
- Currently, I believe it's better to have a manual keyboard dismiss button
- Would rather not construct my own Chat UI right now, but can do so easily after the demo is launched
- I would rather have a UI discrepancy, even though it's very unideal, than have a VirtualizedList nested inside ScrollView (Scrolling Keyboard probably uses a scrollview)
- Continuing development with GiftedChat until I have a workable demo. 
- After that, I'll create a chat component from the ground up; ideally working on every platform.

## 9/5/2023 GiftedChat pt 2
#### Takeaways
- Android keyboard, by default, has a keyboard dismiss button (ref to 8/27)
- I will eventually create my own React Native chat component
- Until then, I forked GiftedChat and made my own changes to my fork
- Exploring GiftedChat source code should also help me make my own component later down the road

