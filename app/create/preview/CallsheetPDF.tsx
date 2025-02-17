import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#d9d9d9',
    padding: 8,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  talentSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: 1,
    borderTopColor: '#d9d9d9',
  },
  banner: {
    backgroundColor: '#000000',
    padding: 8,
    marginVertical: 10,
  },
  bannerText: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
  },
})

// PDF Component
const CallsheetPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>CALLSHEET®</Text>
        <Text>{new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          CALLSHEET.CO CALLSHEET.CO CALLSHEET.CO CALLSHEET.CO CALLSHEET.CO
        </Text>
      </View>

      <Text style={styles.title}>{data.title || 'My Callsheet'}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRODUCTION DETAILS</Text>
        <Text style={styles.content}>Overview: {data.overview || 'N/A'}</Text>
        <Text style={styles.content}>Location: {data.location || 'N/A'}</Text>
        <Text style={styles.content}>Additional Details: {data.locationDetails || 'N/A'}</Text>
        <Text style={styles.content}>Date: {data.date || 'N/A'}</Text>
        <Text style={styles.content}>Call Time: {data.callTime || 'N/A'}</Text>
        <Text style={styles.content}>Wrap Time: {data.wrapTime || 'N/A'}</Text>
        <Text style={styles.content}>Setting: {data.indoorOutdoor || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TALENT INFORMATION</Text>
        {data.talents?.map((talent, index) => (
          <View key={index} style={styles.talentSection}>
            <Text style={styles.content}>Talent {index + 1}</Text>
            <Text style={styles.content}>Role: {talent.role || 'N/A'}</Text>
            <Text style={styles.content}>Name: {talent.name || 'N/A'}</Text>
            <Text style={styles.content}>Phone: {talent.phone || 'N/A'}</Text>
            <Text style={styles.content}>Email: {talent.email || 'N/A'}</Text>
            <Text style={styles.content}>Call Time: {talent.callTime || 'N/A'}</Text>
            <Text style={styles.content}>Call Out: {talent.callOut || 'N/A'}</Text>
            <Text style={styles.content}>Notes: {talent.notes || 'N/A'}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

export default CallsheetPDF

