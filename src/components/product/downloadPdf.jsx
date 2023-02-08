import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
// Create Document Component
  const DownloadPDF = (props) => {

    
    // Create styles
const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: "column",
        backgroundColor: 'white'
      },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin:"10px 10px 10px 10px"
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
      },
      description: {
        width: "60%",
        backgroundColor:"#cdcdcd",        
        border: "2px solid white",
        padding: "2px 2px 2px 5px"
      },
      title: {
        alignItems:"center",
        fontSize:"20px",
        margin: "50px 10px 50px 50px",
     
      },
      xyz: {
        width: "40%",
        backgroundColor:"white",        
        border: "2px solid black",
        padding: "2px 2px 2px 5px"
    },
  });


    return(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.tableContainer}>
        <Text style={styles.title}>Inventory</Text>
        <table className="table">

                <View  style={styles.row}>        
                        <Text style={styles.description}>Code</Text>
                        <Text style={styles.description}>Name</Text>
                        <Text style={styles.description}>Price</Text>
                        <Text style={styles.description}>Quiantity</Text>
                        
                    
                </View>
                
                    {
                        props.products.map((data, index) => {
                            return (
                                <View key={index} style={styles.row} >
                                    <Text style={styles.xyz}>{data.code}</Text>
                                    <Text style={styles.xyz}>{data.name}</Text>
                                    <Text style={styles.xyz}>{data.price}</Text>
                                    <Text style={styles.xyz}>{data.quantity}</Text>
                                                                       
                                </View>



                            )
                        })
                    }
                
            </table>
        </View>
        
      </Page>
    </Document>);
  };

  export default DownloadPDF;