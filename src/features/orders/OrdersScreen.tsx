import {View, Text, ScrollView, TouchableOpacity, Switch, Image, Modal, Dimensions} from 'react-native';
import React, {FC, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from '@components/global/Icon';

// Mock data for orders
const mockOrders = [
  {
    id: '1',
    customerName: 'John Doe',
    customerPhone: '+91 98765 43210',
    items: [
      {
        name: 'Chicken Biryani', 
        quantity: 2, 
        price: 250, 
        image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/b461d252b9bfa267e5faa89a5284853f',
        description: 'Aromatic basmati rice with tender chicken pieces'
      },
      {
        name: 'Mutton Curry', 
        quantity: 1, 
        price: 350, 
        image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/c00bd9cd2bf28b999771d66bd836aace',
        description: 'Rich and flavorful mutton curry with spices'
      },
    ],
    total: 850,
    status: 'pending',
    orderTime: '2024-01-15 14:30',
    deliveryAddress: '123 Main St, Bakhtiyarpur Market',
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerPhone: '+91 87654 32109',
    items: [
      {
        name: 'Margherita Pizza', 
        quantity: 1, 
        price: 299, 
        image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/dpventcrozvfni0lqb10',
        description: 'Classic pizza with fresh mozzarella and basil'
      },
      {
        name: 'Garlic Naan', 
        quantity: 2, 
        price: 45, 
        image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Paratha.png',
        description: 'Soft naan bread with garlic and herbs'
      },
    ],
    total: 389,
    status: 'preparing',
    orderTime: '2024-01-15 15:15',
    deliveryAddress: '456 Park Ave, Bakhtiyarpur Market',
    paymentMethod: 'Online Payment',
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    customerPhone: '+91 76543 21098',
    items: [
      {
        name: 'Chicken Dehati', 
        quantity: 1, 
        price: 200, 
        image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/c00bd9cd2bf28b999771d66bd836aace',
        description: 'Traditional village-style chicken curry'
      },
      {
        name: 'Butter Roti', 
        quantity: 3, 
        price: 25, 
        image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Paratha.png',
        description: 'Fresh roti with butter'
      },
    ],
    total: 275,
    status: 'delivered',
    orderTime: '2024-01-15 13:45',
    deliveryAddress: '789 Oak St, Bakhtiyarpur Market',
    paymentMethod: 'Cash on Delivery',
  },
];

const OrdersScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const {styles} = useStyles(homeStyles);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [foodModalVisible, setFoodModalVisible] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'preparing': return '#2196F3';
      case 'delivered': return '#4CAF50';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  const renderOrderCard = (order: any) => (
    <TouchableOpacity
      key={order.id}
      onPress={() => {
        setSelectedOrder(order);
        setModalVisible(true);
      }}
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
      }}>
      
      {/* Order Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <View>
          <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
            Order #{order.id}
          </CustomText>
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666">
            {order.orderTime}
          </CustomText>
        </View>
        <View
          style={{
            backgroundColor: getStatusColor(order.status),
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 20,
          }}>
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#fff">
            {getStatusText(order.status)}
          </CustomText>
        </View>
      </View>

      {/* Customer Info (Admin View) */}
      {isAdmin && (
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#f8f9fa',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}>
          <CustomText fontFamily="Okra-Bold" fontSize={14} color="#333" style={{marginBottom: 4}}>
            Customer: {order.customerName}
          </CustomText>
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666">
            {order.customerPhone}
          </CustomText>
        </View>
      )}

      {/* Food Items */}
      <View style={{padding: 16}}>
        <CustomText fontFamily="Okra-Bold" fontSize={14} color="#333" style={{marginBottom: 12}}>
          {isAdmin ? 'Order Items' : 'Your Order'}
        </CustomText>
        {order.items.map((item: any, index: number) => (
          <View key={index} style={{
            flexDirection: 'row',
            marginBottom: 12,
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: 12,
          }}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginRight: 12,
              }}
            />
            <View style={{flex: 1, justifyContent: 'center'}}>
              <CustomText fontFamily="Okra-Bold" fontSize={14} color="#333" style={{marginBottom: 4}}>
                {item.name}
              </CustomText>
              <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666" style={{marginBottom: 4}}>
                {item.description}
              </CustomText>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666">
                  Qty: {item.quantity}
                </CustomText>
                <CustomText fontFamily="Okra-Bold" fontSize={14} color="#333">
                  ₹{item.price * item.quantity}
                </CustomText>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Order Summary */}
      <View style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#f8f9fa',
      }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
          <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
            Total Amount
          </CustomText>
          <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
            ₹{order.total}
          </CustomText>
        </View>
        <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666">
          Payment: {order.paymentMethod}
        </CustomText>
        {isAdmin && (
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666" style={{marginTop: 4}}>
            Address: {order.deliveryAddress}
          </CustomText>
        )}
      </View>

      {/* Action Buttons (Admin View) */}
      {isAdmin && order.status !== 'delivered' && (
        <View style={{
          flexDirection: 'row',
          padding: 16,
          gap: 12,
        }}>
          {order.status === 'pending' && (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#2196F3',
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <CustomText fontFamily="Okra-Medium" fontSize={14} color="#fff">
                Start Preparing
              </CustomText>
            </TouchableOpacity>
          )}
          {order.status === 'preparing' && (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#4CAF50',
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <CustomText fontFamily="Okra-Medium" fontSize={14} color="#fff">
                Mark Delivered
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <CustomText fontFamily="Okra-Bold" fontSize={20} color="#333">
          {isAdmin ? 'Orders Management' : 'My Orders'}
        </CustomText>
        
        {/* Admin Toggle */}
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666">
            {isAdmin ? 'Admin' : 'User'}
          </CustomText>
          <Switch
            value={isAdmin}
            onValueChange={setIsAdmin}
            trackColor={{false: '#E0E0E0', true: Colors.primary}}
            thumbColor={isAdmin ? '#fff' : '#fff'}
          />
        </View>
      </View>

      {/* Orders List */}
      <ScrollView 
        style={{flex: 1}} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      >
        {mockOrders.length > 0 ? (
          mockOrders.map(renderOrderCard)
        ) : (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100}}>
            <Icon
              name="receipt-outline"
              iconFamily="Ionicons"
              size={64}
              color="#ccc"
            />
            <CustomText fontFamily="Okra-Medium" fontSize={16} color="#666" style={{marginTop: 16}}>
              {isAdmin ? 'No orders received yet' : 'No orders found'}
            </CustomText>
            <CustomText fontFamily="Okra-Medium" fontSize={12} color="#999" style={{marginTop: 8}}>
              {isAdmin ? 'Orders will appear here when customers place them' : 'Your order history will appear here'}
            </CustomText>
          </View>
        )}
      </ScrollView>

      {/* Order Details Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: Dimensions.get('window').height * 0.8,
            minHeight: 400,
          }}>
            {/* Modal Header */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
            }}>
              <CustomText fontFamily="Okra-Bold" fontSize={18} color="#333">
                Order Details
              </CustomText>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: 20,
                  padding: 8,
                }}
              >
                <Icon name="close" iconFamily="Ionicons" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {selectedOrder && (
                <View style={{padding: 20}}>
                  {/* Order Info */}
                  <View style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 20,
                  }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                      <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
                        Order #{selectedOrder.id}
                      </CustomText>
                      <View
                        style={{
                          backgroundColor: getStatusColor(selectedOrder.status),
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                          borderRadius: 20,
                        }}
                      >
                        <CustomText fontFamily="Okra-Medium" fontSize={12} color="#fff">
                          {getStatusText(selectedOrder.status)}
                        </CustomText>
                      </View>
                    </View>
                    <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                      {selectedOrder.orderTime}
                    </CustomText>
                  </View>

                  {/* Customer Info (Admin View) */}
                  {isAdmin && (
                    <View style={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 20,
                    }}>
                      <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333" style={{marginBottom: 12}}>
                        Customer Details
                      </CustomText>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666" style={{marginBottom: 4}}>
                        {selectedOrder.customerName}
                      </CustomText>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666" style={{marginBottom: 4}}>
                        {selectedOrder.customerPhone}
                      </CustomText>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                        {selectedOrder.deliveryAddress}
                      </CustomText>
                    </View>
                  )}

                  {/* Order Items */}
                  <View style={{marginBottom: 20}}>
                    <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333" style={{marginBottom: 12}}>
                      {isAdmin ? 'Order Items' : 'Your Order'}
                    </CustomText>
                    {selectedOrder.items.map((item: any, index: number) => (
                      <View key={index} style={{
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 2,
                        elevation: 2,
                      }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 8,
                            marginRight: 12,
                          }}
                        />
                        <View style={{flex: 1, justifyContent: 'center'}}>
                          <CustomText fontFamily="Okra-Bold" fontSize={14} color="#333" style={{marginBottom: 4}}>
                            {item.name}
                          </CustomText>
                          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666" style={{marginBottom: 4}}>
                            {item.description}
                          </CustomText>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666">
                              Quantity: {item.quantity}
                            </CustomText>
                            <CustomText fontFamily="Okra-Bold" fontSize={14} color="#333">
                              ₹{item.price * item.quantity}
                            </CustomText>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Order Summary */}
                  <View style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 20,
                  }}>
                    <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333" style={{marginBottom: 12}}>
                      Order Summary
                    </CustomText>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                        Subtotal
                      </CustomText>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                        ₹{selectedOrder.total}
                      </CustomText>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                        Delivery Fee
                      </CustomText>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                        Free
                      </CustomText>
                    </View>
                    <View style={{height: 1, backgroundColor: '#e0e0e0', marginVertical: 8}} />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                      <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
                        Total
                      </CustomText>
                      <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
                        ₹{selectedOrder.total}
                      </CustomText>
                    </View>
                    <CustomText fontFamily="Okra-Medium" fontSize={12} color="#666">
                      Payment: {selectedOrder.paymentMethod}
                    </CustomText>
                  </View>

                  {/* Action Buttons (Admin View) */}
                  {isAdmin && selectedOrder.status !== 'delivered' && (
                    <View style={{flexDirection: 'row', gap: 12, marginBottom: 20}}>
                      {selectedOrder.status === 'pending' && (
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            backgroundColor: '#2196F3',
                            paddingVertical: 12,
                            borderRadius: 12,
                            alignItems: 'center',
                          }}>
                          <CustomText fontFamily="Okra-Medium" fontSize={14} color="#fff">
                            Start Preparing
                          </CustomText>
                        </TouchableOpacity>
                      )}
                      {selectedOrder.status === 'preparing' && (
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            backgroundColor: '#4CAF50',
                            paddingVertical: 12,
                            borderRadius: 12,
                            alignItems: 'center',
                          }}>
                          <CustomText fontFamily="Okra-Medium" fontSize={14} color="#fff">
                            Mark Delivered
                          </CustomText>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Food Item Details Modal */}
      {foodModalVisible && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
          zIndex: 9999,
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: Dimensions.get('window').height * 0.6,
            minHeight: 300,
          }}>
            {/* Modal Header */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
            }}>
              <CustomText fontFamily="Okra-Bold" fontSize={18} color="#333">
                Food Details
              </CustomText>
              <TouchableOpacity
                onPress={() => setFoodModalVisible(false)}
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: 20,
                  padding: 8,
                }}
              >
                <Icon name="close" iconFamily="Ionicons" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {selectedFoodItem && (
                <View style={{padding: 20}}>
                  {/* Food Image */}
                  <View style={{
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                    <Image
                      source={{uri: selectedFoodItem.image}}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 12,
                      }}
                    />
                  </View>

                  {/* Food Info */}
                  <View style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 20,
                  }}>
                    <CustomText fontFamily="Okra-Bold" fontSize={20} color="#333" style={{marginBottom: 8}}>
                      {selectedFoodItem.name}
                    </CustomText>
                    <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666" style={{marginBottom: 12}}>
                      {selectedFoodItem.description}
                    </CustomText>
                    
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                        Quantity
                      </CustomText>
                      <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
                        {selectedFoodItem.quantity}
                      </CustomText>
                    </View>
                    
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                      <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                        Price per item
                      </CustomText>
                      <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333">
                        ₹{selectedFoodItem.price}
                      </CustomText>
                    </View>
                    
                    <View style={{
                      height: 1,
                      backgroundColor: '#e0e0e0',
                      marginVertical: 8,
                    }} />
                    
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <CustomText fontFamily="Okra-Bold" fontSize={18} color="#333">
                        Total
                      </CustomText>
                      <CustomText fontFamily="Okra-Bold" fontSize={18} color="#333">
                        ₹{selectedFoodItem.price * selectedFoodItem.quantity}
                      </CustomText>
                    </View>
                  </View>

                  {/* Additional Info */}
                  <View style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 12,
                    padding: 16,
                  }}>
                    <CustomText fontFamily="Okra-Bold" fontSize={16} color="#333" style={{marginBottom: 8}}>
                      Order Information
                    </CustomText>
                    <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666" style={{marginBottom: 4}}>
                      • Fresh ingredients used
                    </CustomText>
                    <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666" style={{marginBottom: 4}}>
                      • Prepared with authentic spices
                    </CustomText>
                    <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666" style={{marginBottom: 4}}>
                      • Hot and fresh delivery
                    </CustomText>
                    <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
                      • 30 minutes preparation time
                    </CustomText>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrdersScreen;
