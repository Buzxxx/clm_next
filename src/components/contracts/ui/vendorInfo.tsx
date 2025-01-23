"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "@/app/contracts/contract.module.css"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Vendor } from "../features/contractsObject"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(2),
})

export const GeneralInfo = ({ vendor }: { vendor: Vendor }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const images = [
    { src: "/contracts/images/screenshot1.webp", alt: "Screenshot 1" },
    { src: "/contracts/images/screenshot2.webp", alt: "Screenshot 2" },
    { src: "/contracts/images/screenshot3.webp", alt: "Screenshot 3" },
    { src: "/contracts/images/screenshot4.webp", alt: "Screenshot 4" },
    { src: "/contracts/images/screenshot5.webp", alt: "Screenshot 5" },
  ]

  const [showAll, setShowAll] = useState(false) // State to toggle full gallery

  return (
    <div className="flex gap-4 md:flex-row flex-col">
      <div className="md:w-2/3 flex flex-col gap-8">
        <div>
          <h4 className={`${styles.textPrimary} font-semibold text-lg mb-2`}>
            Address
          </h4>
          <div
            className={`${styles.bgPrimary} px-4 py-6 rounded-lg shadow-lg `}
          >
            <h6 className="text-base font-medium mb-1">Billing Address</h6>
            <p className={`text-sm ${styles.textGray}`}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
              molestias.
            </p>
          </div>
        </div>
        <div>
          <h4 className={`${styles.textPrimary} font-semibold text-lg mb-2`}>
            About
          </h4>
          <div
            className={`${styles.bgPrimary} px-4 py-6 rounded-lg shadow-lg `}
          >
            <p className={`text-sm ${styles.textGray}`}>{vendor.description}</p>
          </div>
        </div>
        <div>
          <h4 className={`${styles.textPrimary} font-semibold text-lg mb-2`}>
            How does it work?
          </h4>
          <div
            className={`${styles.bgPrimary} px-4 py-6 rounded-lg shadow-lg `}
          >
            <p className={`text-sm ${styles.textGray}`}>
              {vendor.vendorName} leverages cutting-edge technologies including
              AI, NLP, and machine learning to enable end-to-end management of
              the contract lifecycle. It leverages configurable workflows,
              pre-approved clause and template libraries, advanced collaboration
              capabilities and AI-powered legal review to enable the creation of
              stronger, compliant contracts, faster than ever before. <br />{" "}
              <br />
              {vendor.vendorName} helps enterprises digitize their existing
              contracts to analyze hidden risks and opportunities across their
              legacy contract portfolio. It plugs into an enterprise’s existing
              tech stack, pulls in contracts and associated artefacts from
              across various systems, and uses AI to digitize legacy contracts
              (including the auto-capture of 100s of metadata fields), and
              migrate them to a centralized repository. These contracts can then
              be easily interrogated for insights. <br /> <br />{" "}
              {vendor.vendorName} offers advanced capabilities for tracking the embedded obligations and service levels till fulfilment and eventual renewal or expiration. This applies to new contracts authored in{" "}
              {vendor.vendorName} as well as digitzed legacy contracts.
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 flex flex-col gap-8">
        <div>
          <h4 className={`${styles.textPrimary} font-semibold text-lg mb-2`}>
            Screenshots
          </h4>
          <div className={`${styles.bgPrimary} px-4 py-6 rounded-lg shadow-lg`}>
            <div className="grid grid-cols-10 grid-rows-7 gap-4 h-60 w-full">
              <div className="col-span-6 row-span-7">
                <Image
                  className={`rounded-lg object-cover h-full w-full border border-slate-300 hover:${styles.borderSecondary} `}
                  src={images[0].src}
                  alt={images[0].alt}
                  width={400}
                  height={400}
                />
              </div>

              <div className="col-span-4 row-span-4">
                <Image
                  className={`rounded-lg object-cover h-full w-full border border-slate-300 hover:${styles.borderSecondary} `}
                  src={images[1].src}
                  alt={images[1].alt}
                  width={400}
                  height={400}
                />
              </div>

              <div className=" col-span-2 row-span-3">
                <Image
                  className={`rounded-lg object-cover h-full w-full border border-slate-300 hover:${styles.borderSecondary} `}
                  src={images[2].src}
                  alt={images[2].alt}
                  width={400}
                  height={400}
                />
              </div>

              {/* Conditionally show the "+2 more" div */}
              {!showAll && images.length > 3 && (
                <div
                  onClick={() => setShowAll(true)}
                  className={`cursor-pointer flex items-center justify-center bg-gray-300 text-center rounded-lg col-span-2 row-span-3 ${styles.textGray} text-xs border border-slate-300`}
                >
                  +{images.length - 3} more
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h4 className={`${styles.textPrimary} font-semibold text-lg mb-2`}>
            Contact Vendor
          </h4>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`${styles.bgPrimary} px-4 py-6 rounded-lg shadow-lg space-y-2`}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={`${styles.btnSecondary} block w-fit ml-auto mt-2`}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>

        <p className={` text-sm ${styles.textMuted} `}>
          &#9432; This site is protected by reCAPTCHA and the Google Privacy
          Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  )
}
