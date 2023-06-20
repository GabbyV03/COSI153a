import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BudgetTracker = () => {
  const [categories, setCategories] = useState([
    { name: 'Groceries', budget: 0, expenses: 0 },
    { name: 'Luxuries', budget: 0, expenses: 0 },
    { name: 'Bills', budget: 0, expenses: 0 },
    { name: 'Day by Day', budget: 0, expenses: 0 },
  ]);

  useEffect(() => {
    loadBudgetData();
  }, []);

  const loadBudgetData = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('budgetCategories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.log('Error loading budget data:', error);
    }
  };

  const saveBudgetData = async () => {
    try {
      await AsyncStorage.setItem('budgetCategories', JSON.stringify(categories));
    } catch (error) {
      console.log('Error saving budget data:', error);
    }
  };

  const handleBudgetInput = (categoryIndex, budget) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      updatedCategories[categoryIndex].budget = parseFloat(budget);
      return updatedCategories;
    });
  };

  const handleExpenseInput = (categoryIndex, expense) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      updatedCategories[categoryIndex].expenses += parseFloat(expense);
      return updatedCategories;
    });
  };

  useEffect(() => {
    saveBudgetData();
  }, [categories]);

  return (
    <ScrollView style={styles.container}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <BudgetInput
            handleBudgetInput={handleBudgetInput}
            categoryIndex={index}
          />
          <View style={styles.budgetBar}>
            <View
              style={[
                styles.expensesBar,
                {
                  width: `${(category.expenses / category.budget) * 100}%`,
                },
              ]}
            />
          </View>
          <Text>Budget: ${category.budget}</Text>
          <Text>Expenses: ${category.expenses}</Text>
          <Text>Remaining: ${category.budget - category.expenses}</Text>
          <ExpenseInput
            handleExpenseInput={handleExpenseInput}
            categoryIndex={index}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const BudgetInput = ({ handleBudgetInput, categoryIndex }) => {
  const [budget, setBudget] = useState('');

  const handleInputChange = (text) => {
    setBudget(text);
    handleBudgetInput(categoryIndex, text);
  };

  return (
    <TextInput
      style={styles.input}
      placeholder="Enter budget"
      value={budget}
      onChangeText={handleInputChange}
    />
  );
};

const ExpenseInput = ({ handleExpenseInput, categoryIndex }) => {
  const [expense, setExpense] = useState('');

  const handleInputChange = (text) => {
    setExpense(text);
  };

  const handleAddExpense = () => {
    handleExpenseInput(categoryIndex, expense);
    setExpense('');
  };

  return (
    <View style={styles.expenseInputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter expense"
        value={expense}
        onChangeText={handleInputChange}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
  },
  budgetBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 8,
  },
  expensesBar: {
    height: '100%',
    backgroundColor: 'green',
  },
  expenseInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BudgetTracker;