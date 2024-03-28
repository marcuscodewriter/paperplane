import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler

# Set up basic logging to see errors and debugging information
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Token of your telegram bot
TOKEN = '6500150967:AAFwC-SAVG4SDv0p64G_BGaOMPwRVUHnqJU'
# URL of your mini-app
MINI_APP_URL = 'https://marcuscodewriter.github.io/paperplane/'
# URL of your telegram group
TG_GROUP_URL = 'https://t.me/paperplane_ton'

# Asynchronous function to handle the /start command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Preset message
    message = "The Paper $PLANE Movement\n\nTelegram's symbol of resistance against censorship ✈\n\nClick below to play and join our group to stay updated!"
    
    # Inline keyboard button leading to the mini-app
    keyboard = [[InlineKeyboardButton("Play", web_app={'url': MINI_APP_URL})], [InlineKeyboardButton("Join $PLANE", url=TG_GROUP_URL)]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Send message with button
    # await context.bot.send_message(chat_id=update.effective_chat.id, text=message, reply_markup=reply_markup, parse_mode='Markdown',link_preview_options='{"is_disabled":true}')
    await context.bot.send_video(chat_id=update.effective_chat.id,
                                #  photo='https://marcuscodewriter.github.io/twa-boilerplate/assets/loadingIcon.JPG',
                                 video='https://marcuscodewriter.github.io/paperplane/assets/loading.gif',
                                 caption=message, reply_markup=reply_markup, caption_entities='[{"type":"text_link","offset":27,"length":52,"url":"https://x.com/paperplane_ton/status/1748511835123511377"},{"type":"bold","offset":27,"length":52}]')

# Main function where the bot is set up and runs
if __name__ == '__main__':
    # Create an application using the bot token
    application = ApplicationBuilder().token(TOKEN).build()

    # Create command handlers for the /start and /play commands and add them to the application
    application.add_handler(CommandHandler('start', start))
    
    # Start the bot and run it until it's stopped manually
    application.run_polling()