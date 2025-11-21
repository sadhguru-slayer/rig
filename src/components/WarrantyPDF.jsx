// components/WarrantyPDF.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica",
    },

    container: {
        border: "2px solid #99d5d3", // teal-200
        borderRadius: 10,
        padding: 30,
    },

    title: {
        textAlign: "center",
        fontSize: 28,
        marginBottom: 4,
        fontWeight: "bold",
        color: "#0f766e", // teal-900
    },

    underline: {
        height: 3,
        width: 120,
        backgroundColor: "#14b8a6", // teal-500
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
    },

    sectionGrid: {
        marginTop: 10,
        marginBottom: 25,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    gridItem: {
        width: "50%",
        marginBottom: 12,
    },

    label: {
        fontSize: 12,
        color: "#6b7280", // gray-500
    },

    value: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#374151", // gray-800
    },

    bodyWrapper: {
        backgroundColor: "#f5f6f7", // gray-50
        padding: 18,
        borderRadius: 10,
    },

    serviceTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0e766e",
        borderLeft: "4px solid #0d9488",
        paddingLeft: 10,
        marginBottom: 10,
    },

    subService: {
        fontSize: 16,
        fontWeight: "medium",
        color: "#374151",
        paddingLeft: 10,
        marginBottom: 20,
    },

    warrantyHeading: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0d9488",
        borderBottom: "1px solid #99d5d3",
        paddingBottom: 6,
        marginBottom: 15,
    },

    warrantyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 6,
        marginBottom: 6,
        borderBottom: "1px dashed #cccccc",
    },

    warrantyLabel: {
        fontSize: 13,
        fontWeight: "medium",
        color: "#374151",
    },

    warrantyValue: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#111827",
    },

    footer: {
        marginTop: 30,
        paddingTop: 12,
        borderTop: "1px solid #e5e7eb",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 11,
        color: "#6b7280",
    },

    signatureSpace: {
        height: 30,
    },
});

export default function WarrantyPDF({ item, order }) {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.container}>

                    {/* Title */}
                    <Text style={styles.title}>WARRANTY CERTIFICATE</Text>
                    <View style={styles.underline}></View>

                    {/* Customer Details */}
                    <View style={styles.sectionGrid}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Customer Name</Text>
                            <Text style={styles.value}>{order.customer.name}</Text>
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Order Number</Text>
                            <Text style={styles.value}>{order.orderNo}</Text>
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Service</Text>
                            <Text style={styles.value}>{item.service.title}</Text>
                        </View>

                        <View style={styles.gridItem}>
                            <Text style={styles.label}>Installation Date</Text>
                            <Text style={styles.value}>
                                {order.installDate
                                    ? format(new Date(order.installDate), "PPP")
                                    : "N/A"}
                            </Text>
                        </View>
                    </View>

                    {/* Certificate Body */}
                    <View style={styles.bodyWrapper}>
                        <Text style={styles.serviceTitle}>{item.service.title}</Text>

                        {item.subService && (
                            <Text style={styles.subService}>{item.subService.title}</Text>
                        )}

                        {/* Warranty Heading */}
                        <Text style={styles.warrantyHeading}>Warranty Coverage</Text>

                        {/* Warranty Rows */}
                        {Object.entries(item.warranty).map(([key, w]) => (
                            <View key={key} style={styles.warrantyRow}>
                                <Text style={styles.warrantyLabel}>{w.label}</Text>
                                <Text style={styles.warrantyValue}>
                                    {w.durationMonths} Months{" "}
                                    {w.expiresOn &&
                                        `(Expires: ${format(new Date(w.expiresOn), "PP")})`}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View>
                            <Text>Reddy Invisible Grills</Text>
                            <Text>Support: +91 9676282296</Text>
                        </View>

                        <View>
                            <Text>Authorized Signature</Text>
                            <View style={styles.signatureSpace} />
                        </View>
                    </View>

                </View>
            </Page>
        </Document>
    );
}
