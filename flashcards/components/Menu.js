import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Menu({isOpen, setIsOpen}) {
    return (
        <>
            { isOpen && <Pressable style={styles.background} onPress={()=>setIsOpen(!isOpen)}>
                <View style={styles.background} />
            </Pressable> }
            <View style={[styles.foreground, isOpen ? {left: 0} : {right: '100%'}]} >
                <Text style={styles.title} >Name Here</Text>
                <Text style={styles.option} >Create deck</Text>
                <Text style={styles.option} >Number 1 deck</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        zIndex: 300,
        position: 'absolute',
        backgroundColor: 'red',
    },
    foreground: {
        height: '100%',
        width: '45%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        zIndex: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
    },
    option: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
});