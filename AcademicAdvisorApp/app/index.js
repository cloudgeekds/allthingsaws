import { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    Pressable,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

// Message bubble component
const MessageBubble = ({ message, isUser }) => (
    <View style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.assistantBubble
    ]}>
        <Text style={[
            styles.messageText,
            isUser ? styles.userText : styles.assistantText
        ]}>
            {message.text}
        </Text>
    </View>
);

export default function MainScreen() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([
        {
            id: 1,
            text: "¡Hola! Soy tu Tutor Académico LatamAI. Puedo ayudarte con:\n\n" +
                "• Resumir contenido de cursos\n" +
                "• Recomendar cursos basados en tus intereses\n" +
                "• Generar pruebas de práctica\n\n" +
                "¿Cómo puedo ayudarte hoy?",
            isUser: false
        }
    ]);

    const scrollViewRef = useRef();

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: chat.length + 1,
                text: message,
                isUser: true
            };

            setChat([...chat, newMessage]);
            setMessage('');

            setTimeout(() => {
                setChat(current => [...current, {
                    id: current.length + 1,
                    text: "Estoy procesando tu consulta...",
                    isUser: false,
                    isTyping: true
                }]);
            }, 500);

            setTimeout(() => {
                setChat(current => [
                    ...current.filter(msg => !msg.isTyping),
                    {
                        id: current.length + 1,
                        text: "Esta es una respuesta de ejemplo. En la implementación real, aquí se mostrarán las respuestas del modelo de IA basadas en el contenido de los cursos y tu consulta específica.",
                        isUser: false
                    }
                ]);
            }, 2000);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header Container with Title and Subtitle */}
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>AWSomeU</Text>
                    <Text style={styles.subtitle}>Tutor Académico LatamAI</Text>
                </View>
            </View>

            {/* Chat Interface */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.chatContainer}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    {chat.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} isUser={msg.isUser} />
                    ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Escribe tu pregunta aquí..."
                        multiline={false}  // Changed to false to simplify
                        maxLength={500}
                        autoCorrect={false}  // Disable autocorrect
                        autoCapitalize="none"  // Disable auto capitalization
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="send"  // Changes return key to "send"
                        blurOnSubmit={true}
                        onSubmitEditing={handleSend}  // Send message when return is pressed
                    />

                    <Pressable
                        style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                        onPress={handleSend}
                        disabled={!message.trim()}
                    >
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        height: '25%', // Takes up 1/4 of the screen
        backgroundColor: '#F68D11',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    chatContainer: {
        flex: 1,
        padding: 15,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 20,
        marginVertical: 5,
    },
    userBubble: {
        backgroundColor: '#007AFF',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 5,
    },
    assistantBubble: {
        backgroundColor: '#E8E8E8',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 5,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    userText: {
        color: '#FFFFFF',
    },
    assistantText: {
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 16,
        height: 40,  // Fixed height
        textAlignVertical: 'center',  // Center text vertically
    },
    sendButton: {
        backgroundColor: '#F68D11',
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
