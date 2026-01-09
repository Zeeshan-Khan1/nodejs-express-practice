import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadToCloudinary = (file, folder = 'team-members') => {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            reject(new Error('No file buffer provided'))
            return
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: folder
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error)
                    reject(error)
                } else {
                    console.log('Cloudinary upload success:', result.secure_url)
                    resolve(result.secure_url)
                }
            }
        )

        uploadStream.end(file.buffer)
    })
}

export const deleteFromCloudinary = (imageUrl) => {
    return new Promise((resolve, reject) => {
        if (!imageUrl) {
            resolve(null)
            return
        }

        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{folder}/{public_id}.{format}
        try {
            // Match the pattern: /upload/v{version}/{everything_after}
            const match = imageUrl.match(/\/upload\/v\d+\/(.+)/)
            if (!match) {
                console.log('Invalid Cloudinary URL, skipping delete:', imageUrl)
                resolve(null)
                return
            }

            // Get everything after version number
            const pathAfterVersion = match[1]
            // Remove file extension to get public_id
            const publicId = pathAfterVersion.replace(/\.[^/.]+$/, '')

            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error('Cloudinary delete error:', error)
                    // Don't reject, just log the error and resolve
                    // This way the update can continue even if delete fails
                    resolve(null)
                } else {
                    console.log('Cloudinary delete success:', publicId)
                    resolve(result)
                }
            })
        } catch (error) {
            console.error('Error parsing Cloudinary URL:', error)
            // Don't reject, just resolve to allow update to continue
            resolve(null)
        }
    })
}

export default cloudinary

