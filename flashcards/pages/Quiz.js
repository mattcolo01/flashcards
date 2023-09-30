import { useEffect, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, Vibration, View } from "react-native";

import Card from "../components/Card";

export default function Quiz() {
    const [score, setScore] = useState(0);
    const [current, setCurrent] = useState(0);

    const scaleFactor = useRef(new Animated.Value(0)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    var position = useRef(new Animated.ValueXY()).current;
    
    const questions = [
        {
            question: "Is the sky blue?",
            answer: true,
        },
        {
            question: "Is the grass green?",
            answer: true,
        },
        {
            question: "Is the sun yellow?",
            answer: true,
        },
        {
            question: "Is the ocean blue?",
            answer: true,
        },
        {
            question: "Is the ocean purple?",
            answer: false,
        },
    ];

    return (
        <View style={styles.container}>
            { questions.map((question, index) => {
                if (index >= current) 
                    return <Card
                        key={index-current}
                        index={index-current}
                        question={question.question}
                        position={position}
                        swipeHandler={swipeHandler}
                        />
            }).reverse() }
            { questions.length - current === 0 && <>
                <Text onLayout={ () => {Vibration.vibrate(1000,false)} } >Score: {score+"\n"}</Text>
                <Button title="Restart" onPress={() => {setCurrent(0); setScore(0)}} />
            </> }
            <Animated.View style={{ ...styles.circle, opacity: opacityValue, transform: [{scale: scaleFactor}] }} />
            <Text style={styles.wrongText}>Wrong answer</Text>
        </View>
    );

    function swipeHandler(isRight) {
        if ( isRight === questions[current].answer ) setScore(score + 1);
        else {
            Animated.parallel([
                Animated.timing(scaleFactor, {
                    toValue: 100,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(()=>{
                scaleFactor.setValue(0);
                opacityValue.setValue(1);
            });
        }
        setCurrent(current + 1);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent:'center',
        pointerEvents: 'box-none',
    },
    circle: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'red',
        zIndex: 0,
        transform: [{scale: 0}],
    },
    wrongText: {
        position: 'absolute',
        fontSize: 30,
        color: 'white',
        zIndex: 1,
        top: 50,
        fontWeight: 'bold',
    },
});