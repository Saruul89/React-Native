import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { getExpenses, addExpense } from './services/api';

const ExpenseScreen = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenseList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExpense = async () => {
    try {
      await addExpense({ amount, description });
      fetchExpenses(); // Update the list after adding
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Зарлагын бүртгэл</Text>
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
      <Button title="Нэмэх" onPress={handleAddExpense} />
      <FlatList
        data={expenseList}
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

export default ExpenseScreen;
