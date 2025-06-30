import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/layout';
import { useProductStore } from '../store/productStore';

const ProductScreen = () => {
    const { products, loading, error, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    const renderItem = ({ item }) => {
        console.log('Item data:', item); // Log to verify the data structure, especially the color

        return (
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

                    {/* Discount Badge - Show discount if it's more than 0 */}
                    {item.discount > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{item.discount}% Off</Text>
                        </View>
                    )}
                </View>

                <View style={styles.cardDetails}>
                    <Text style={styles.cardTitle}>{item.title}</Text>

                    {/* Displaying Price and Color */}
                    <View style={styles.infoline}>
                        <Text style={styles.cardSubtitle}>Price: ${item.price}</Text>

                        {/* Color section with box and text */}
                        <View style={styles.colorSection}>
                            <Text style={styles.cardSubtitle}>Color:</Text>
                            <View style={[styles.colorBox, { backgroundColor: item.color || '#cccccc' }]} />

                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/menu.png')} style={styles.headerImageLeft} />
                <Text style={styles.headerText}>Welcome</Text>
                <Image source={require('../assets/share.png')} style={styles.headerImageRight} />
            </View>
            <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoSub}>Muqaddas</Text>
                    <Text style={styles.infoSub2}>Developer Name</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoSub}>35.0</Text>
                    <Text style={styles.infoSub2}>SDK Version:</Text>
                </View>
            </View>
            <Text style={styles.subHeader}>Available Products</Text>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.background,
    },
    header: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        position: 'relative',
    },
    headerText: {
        ...FONTS.title,
        color: COLORS.text,
        position: 'absolute',
        top: 18,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    headerImageLeft: {
        position: 'absolute',
        left: 10,
        top: 20,
        width: 40,
        height: 40,
    },
    headerImageRight: {
        position: 'absolute',
        right: 10,
        top: 20,
        width: 30,
        height: 30,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 0,
    },
    infoBox: {
        padding: SIZES.base,
        borderRadius: 20,
        width: '48%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        backgroundColor: '#fff',
    },
    infoSub: {
        ...FONTS.regular,
        color: COLORS.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoSub2: {
        paddingTop: 10,
        ...FONTS.regular,
        color: COLORS.text,
        fontSize: 14,
    },
    subHeader: {
        ...FONTS.bold,
        color: COLORS.text,
        fontSize: 22,
        marginVertical: SIZES.base,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: SIZES.radius,
        marginBottom: SIZES.base * 2,
        // The image shows cards with some spacing, so let's adjust width and add margin.
        // It's a 2-column layout, so 48% width with justify 'space-between' is good.
        width: '48%',
        marginHorizontal: '1%', // Add horizontal margin for spacing between cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    cardDetails: {
        padding: SIZES.base,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cardTitle: {
        ...FONTS.regular,
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    image: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden', // Crucial for the rotated badge to stay within bounds
    },
    list: {
        justifyContent: 'space-between', // Distribute items evenly
    },
    infoline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        width: '100%',
    },
    colorSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorBox: {
        width: 16,
        height: 16,
        borderRadius: 2, // Small border radius for the color box
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 6,
    },
    cardSubtitle: {
        fontSize: 12,
        ...FONTS.text,
        fontWeight: '700',
        textAlign: 'center'
    },
    discountBadge: {
        position: 'absolute',
        top: 25,    // Adjust position to match the image
        left: -30,  // Adjust position to match the image, it's rotated
        backgroundColor: COLORS.red, // Red background
        width: 130, // Fixed width to ensure it covers the corner
        height: 25, // Fixed height
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-45deg' }], // Rotate the badge
        zIndex: 10, // Higher z-index to place on top of the image
        elevation: 5, // For Android devices shadow
    },
    discountText: {
        color: '#fff',
        fontSize: 11, // Smaller font size for "10% Off" as in the image
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        textAlign: 'center',
        color: COLORS.error,
        fontSize: 16,
        marginTop: SIZES.base,
    },
});

export default ProductScreen;
