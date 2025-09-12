import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, Search, Filter, CreditCard as Edit, Trash2, UserPlus } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export default function AdminUsersScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      role: 'Patient',
      status: 'Active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      role: 'Doctor',
      status: 'Active',
      joinDate: '2024-01-10',
    },
    {
      id: 3,
      name: 'Mike Admin',
      email: 'admin@healthcare.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-01',
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return colors.error;
      case 'Doctor':
        return colors.primary;
      case 'Patient':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const UserCard = ({ user }: { user: any }) => (
    <Card style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user.name}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user.email}
          </Text>
        </View>
        <View style={[styles.roleBadge, { backgroundColor: `${getRoleColor(user.role)}20` }]}>
          <Text style={[styles.roleText, { color: getRoleColor(user.role) }]}>
            {user.role}
          </Text>
        </View>
      </View>

      <View style={styles.userDetails}>
        <Text style={[styles.userMeta, { color: colors.textSecondary }]}>
          Status: {user.status} • Joined: {user.joinDate}
        </Text>
      </View>

      <View style={styles.userActions}>
        <Button
          title="Edit"
          variant="outline"
          size="small"
          onPress={() => {}}
          style={styles.actionButton}
        />
        <Button
          title="Delete"
          variant="secondary"
          size="small"
          onPress={() => {}}
          style={[styles.actionButton, { backgroundColor: colors.error + '20' }]}
          textStyle={{ color: colors.error }}
        />
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>User Management</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddUser(true)}
        >
          <Plus size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Search size={20} color={colors.textSecondary} />}
          style={styles.searchInput}
        />
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.accent }]}>
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ScrollView>

      <Modal
        visible={showAddUser}
        onClose={() => setShowAddUser(false)}
        title="Add New User"
      >
        <View style={styles.addUserContent}>
          <Input
            label="Full Name"
            placeholder="Enter full name"
          />
          <Input
            label="Email"
            placeholder="Enter email address"
            keyboardType="email-address"
          />
          <Input
            label="Role"
            placeholder="Select role"
          />
          <Button
            title="Add User"
            onPress={() => setShowAddUser(false)}
            style={styles.addUserButton}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  userCard: {
    marginBottom: 16,
    padding: 16,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  userDetails: {
    marginBottom: 16,
  },
  userMeta: {
    fontSize: 14,
  },
  userActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  addUserContent: {
    paddingTop: 16,
  },
  addUserButton: {
    marginTop: 24,
  },
});