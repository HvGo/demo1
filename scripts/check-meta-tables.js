/**
 * Script para verificar si las tablas de Meta existen en la BD
 * Ejecutar: node scripts/check-meta-tables.js
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkTables() {
  try {
    console.log('🔍 Verificando tablas de Meta...\n');

    // Verificar meta_messages
    const messagesCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'meta_messages'
      );
    `);
    console.log(`✅ meta_messages existe:`, messagesCheck.rows[0].exists);

    // Verificar meta_contacts
    const contactsCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'meta_contacts'
      );
    `);
    console.log(`✅ meta_contacts existe:`, contactsCheck.rows[0].exists);

    // Verificar meta_appointments
    const appointmentsCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'meta_appointments'
      );
    `);
    console.log(`✅ meta_appointments existe:`, appointmentsCheck.rows[0].exists);

    // Verificar meta_webhook_logs
    const logsCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'meta_webhook_logs'
      );
    `);
    console.log(`✅ meta_webhook_logs existe:`, logsCheck.rows[0].exists);

    // Contar registros
    console.log('\n📊 Registros en cada tabla:\n');

    const messagesCount = await pool.query('SELECT COUNT(*) FROM meta_messages');
    console.log(`meta_messages: ${messagesCount.rows[0].count} registros`);

    const contactsCount = await pool.query('SELECT COUNT(*) FROM meta_contacts');
    console.log(`meta_contacts: ${contactsCount.rows[0].count} registros`);

    const appointmentsCount = await pool.query('SELECT COUNT(*) FROM meta_appointments');
    console.log(`meta_appointments: ${appointmentsCount.rows[0].count} registros`);

    const logsCount = await pool.query('SELECT COUNT(*) FROM meta_webhook_logs');
    console.log(`meta_webhook_logs: ${logsCount.rows[0].count} registros`);

    console.log('\n✅ Verificación completada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

checkTables();
