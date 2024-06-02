import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Share
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const QRgenerator = () => {
  const [QRTextValue, setQRValue] = useState("");
  const [QRImage, setQRImage] = useState("");
  const [hasMediaPermission, setMediaPermission] = useState();

  useEffect(() => {
    (async () => {
      try {
        const hasMediaPermission = await MediaLibrary.requestPermissionsAsync();
        setMediaPermission(hasMediaPermission.status === "granted");
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  if (hasMediaPermission === undefined) {
    return <Text>Requesting Permissions...</Text>;
  }

  const convertToImage = () => {
    getDataURL();
  };

  const handleSave = async () => {
    try {
      convertToImage();
      const filename = `image_${Date.now()}.jpg`;
      await FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}${filename}`,
        QRImage,
        { encoding: FileSystem.EncodingType.Base64 }
      );
      await MediaLibrary.saveToLibraryAsync(
        `${FileSystem.documentDirectory}${filename}`
      );
      alert("QR code saved to your gallery/photos.");
    } catch (error) {
      console.error(error);
    }
  };
  const handleShare = async () => {
    try {
      convertToImage();
      const uri = `data:image/jpeg;base64,${QRImage}`;
      await Share.share({ message: `QR-Code for ${QRTextValue}`, url: uri });
    } catch (error) {
      console.error(error);
    }
  };

  const getDataURL = () => {
    this.svg.toDataURL(callback);
  };

  const callback = dataURL => {
    setQRImage(dataURL);
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <TextInput
            placeholder="Enter text or URL"
            style={styles.textInput}
            autoCapitalize="none"
            value={QRTextValue}
            onChangeText={setQRValue}
          />
        </View>
        <QRCode
          size={350}
          value={QRTextValue ? QRTextValue : "No Text"}
          getRef={c => (this.svg = c)}
        />
      </View>
      {hasMediaPermission && (
        <View style={styles.sectionContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => handleShare()}
              disabled={QRTextValue === ""}
            >
              <Text
                style={[
                  styles.sectionDescription,
                  { color: "#fff", fontWeight: "900" }
                ]}
              >
                Share QR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => handleSave()}
            >
              <Text
                style={[
                  styles.sectionDescription,
                  { color: "#fff", fontWeight: "900" }
                ]}
              >
                Save QR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default QRgenerator;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center"
  },
  highlight: {
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "center"
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    marginRight: 10,
    marginVertical: 20,
    borderRadius: 20,
    width: 330,
    borderWidth: 1,
    borderStyle: "solid"
  },
  sectionDescription: {
    padding: 10,
    fontSize: 18,
    fontWeight: "400"
  },
  newButton: {
    backgroundColor: "deepskyblue",
    marginTop: 20,
    marginHorizontal: 60,
    paddingVertical: 5,
    paddingHorizontal: 50,
    borderRadius: 20
  },
  Button: {
    backgroundColor: "deepskyblue",
    marginTop: 2,
    marginHorizontal: 35,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20
  }
});
