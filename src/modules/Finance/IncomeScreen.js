import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { getIncome, addIncome } from './services/api';

const IncomeScreen = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const response = await getIncome();
      setIncomeList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIncome = async () => {
    try {
      await addIncome({ amount, description });
      fetchIncome(); // Update the list after adding
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Орлогын бүртгэл</Text>
      <TextInput
        style={styles.input}
        placeholder="Суудлын дүн"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Тайлбар"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Нэмэх" onPress={handleAddIncome} />
      <FlatList
        data={incomeList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Дүн: {item.amount}</Text>
            <Text>Тайлбар: {item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default IncomeScreen;
