import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button(props) {
    return (
        <TouchableOpacity style={styles.button}>
            { props.children == "true" ?
                <Text style={styles.buttonText}>Ok</Text>
                :
                <Text style={styles.buttonText}>X</Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderRadius: 100000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5,
        width: '20%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});