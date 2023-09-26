import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, Vibration, View } from "react-native";

import Card from "../components/Card";

export default function Quiz() {
    const [score, setScore] = useState(0);
    const [current, setCurrent] = useState(0);
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
            { questions.length - current === 0 && <Text>Score: {score}</Text>}
        </View>
    );

    function swipeHandler(isRight, index) {
        if ( isRight === questions[index+current].answer ) setScore(score + 1);
        else Vibration.vibrate(1000); //TO DO replace with red rippling bachground
        setCurrent(current + 1);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent:'center',
    },
});