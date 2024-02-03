import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore'; // Add this import statement
import { db, auth } from './firebase';


const Login = ({ navigation, onLogin }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateId = () => {
    navigation.navigate('회원가입');
  };

  const handleLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredential) => {
        // 로그인 성공 시 부모 컴포넌트의 onLogin 함수 호출
        console.log("로그인 클릭시 이메일")
        const Email = userCredential.user.email;
        console.log(Email)
        onLogin(Email);
        const userEmail = userCredential.user.email;
        const userRef = doc(db, "users", userEmail);
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            //const userName = userData.name;
            navigation.navigate('Home', { name: userEmail });
          } else {
            console.error('User data not found in Firestore.');
          }
        });
      })
      .catch((error) => {
        // 로그인 실패 시 처리
        alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
        console.error(error.message);
      });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/capstone-ac206.appspot.com/o/%EB%B0%B0%EA%B2%BD.webp?alt=media&token=cabac6ad-77a8-4c88-9366-a33cd01c5bf6' }} // 배경 이미지 파일 경로를 설정하세요
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCreateId}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 배경의 투명도 조절 가능
    borderRadius: 10, // 컨테이너의 모서리를 둥글게 만듦
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black', // 텍스트 색상 변경
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: 'white', // 입력 필드 배경색 변경
    borderRadius: 5, // 입력 필드의 모서리를 둥글게 만듦
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: "#21825B",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin : 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 0,
    
  },
});

export default Login;