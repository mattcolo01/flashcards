import { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

import Card from "../components/Card";

export default function Quiz() {
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
            answer: true,
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
                        answer={question.answer}
                        position={position}
                        swipeHandler={() => { setCurrent(current + 1) }}
                        />
            }).reverse() }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent:'center',
    },
});