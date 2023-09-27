import { StyleSheet, Text, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width

export default function Card({question, index, swipeHandler, position}) {

    let panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
            if(gestureState.dx > 120) {
                Animated.spring(position, {
                    toValue: { x: SCREEN_WIDTH+100, y: gestureState.dy },
                    useNativeDriver: true,
                }).start( async () => {
                    swipeHandler(true);
                    position.setValue({ x: 0, y: 0 });
                });
            } else if (gestureState.dx < -120) {
                Animated.spring(position, {
                    toValue: { x: -SCREEN_WIDTH-100, y: gestureState.dy },
                    useNativeDriver: true,
                }).start( () => {
                    swipeHandler(false);
                    position.setValue({ x: 0, y: 0 });
                });
            } else {
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    friction: 4,
                    useNativeDriver: true,
                }).start();
            }
        }
    });

    let rotation = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });
    let color = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        outputRange: ['red', 'white', 'green'],
        extrapolate: 'clamp',
    });

    let scaling = 1, translation = 0, elevation = 0;
    if(index > 0) {
        scaling = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: [
                1 - 0.05*Math.min(index-1, 3),
                1 - 0.05*Math.min(index, 3),
                1 - 0.05*Math.min(index-1, 3)
            ],
            extrapolate: 'clamp',
        });
        translation = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: [
                -5*Math.min(index-1, 3),
                -5*Math.min(index, 3),
                -5*Math.min(index-1, 3)
            ],
            extrapolate: 'clamp',
        });
        elevation = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: [5, 0, 5],
            extrapolate: 'clamp',
        });
    }

    return (
        <>
            <Animated.View
                {... panResponder.panHandlers}
                style={[
                    styles.card,
                    index === 0 && { backgroundColor: color },
                    index < 4 && { elevation: 5 },
                    index === 4 && { elevation: elevation },
                    {
                        transform: index === 0 ?
                            [
                                {
                                    rotate: rotation
                                },
                                ...position.getTranslateTransform()
                            ]
                            :
                            [{ 
                                translateY: translation
                            }, {
                                scaleX: scaling
                            }]
                    },
                ]} >
                <Text style={styles.cardText}>{question}</Text>
            </Animated.View>
            {/* <View style={styles.answers}>
                <Button>false</Button>
                <Button>true</Button>
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.25,
        zIndex: 2,
    },
    cardText: {
        fontSize: 20,
        color: '#000',
    },
    answers: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        position: 'relative',
    },
});