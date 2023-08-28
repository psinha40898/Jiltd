# Jiltd
### A social network that helps
# 8/27
## GiftedChat
## **Pros**
+ Velocity for development
+ _Technically_ Cross Compatible
## **Cons**
+ Lackluster android capabilities
+ Scrolling Keyboard component throws VirtualizedLists Error
+ Regular Keyboard component does not support touch dismissal on Android (works fine on IOS!)
+ The classic workaround of using regular Keyboard component with TouchableWithouFeedback creates buggy scrolling
## **Takeaways**
+ Currently, I believe it's better to have a manual keyboard dismiss button
+ Would rather not construct my own Chat UI right now, but can do so easily after demo is launched
+ I would rather have a UI discrepency, even though it's very very unideal, than have a VirtualizedList nested inside ScrollView (Scrolling Keyboard probably uses a scrollview)
+ Continuing development with GiftedChat until I have a workable demo. 
+ After that, I'll create a chat component from the ground up; ideally working on every platform.
